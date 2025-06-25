import fetch from 'cross-fetch';

interface WireScoreDefinition {
  timesReached: number;
  globalHighScore: number;
}

interface WireScoreError {
  error: string;
}

type WireScoreResponse = WireScoreDefinition | WireScoreError;

export interface ScoreBoardFromServer {
  reachedBy: number;
  globalHighScore?: number | null;
}

const fetchWith = (url: string, options: any): Promise<WireScoreResponse> =>
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return {
        error: response.statusText + JSON.stringify(response.json())
      };
    })
    .catch(reason => ({
      error: reason
    }));

const apiPost = (
  hostAndPort: string,
  query: string,
  body: any
): Promise<WireScoreResponse> =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

const handleResponse = (
  response: WireScoreResponse
): ScoreBoardFromServer | undefined => {
  if (typeof response.error === 'string') {
    console.error(`Unable to reach ScoreBoard due to ${response.error}`);
  }
  return response.timesReached !== undefined
    ? {
        reachedBy: Number(response.timesReached),
        globalHighScore: response.globalHighScore
          ? Number(response.globalHighScore)
          : undefined
      }
    : undefined;
};

export default (hostAndPort: string, userId: string) => ({
  reachedScore: (score: number): Promise<ScoreBoardFromServer | undefined> =>
    apiPost(hostAndPort, 'scoreboard', { score, u: userId }).then(handleResponse)
});

