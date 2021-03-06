// @flow

import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
  FacebookShareCount,
  RedditShareCount
} from 'react-share';

import './sharecount.css';

type Props = { url: string };

export const shareCount = (count: number) =>
  count !== 0 ? <p className="shareCount">{count}</p> : <p />;

export default (props: Props) => {
  const { url } = props;
  return (
    <div className="shareBox">
      <p className="shareHeader">Share:</p>
      <FacebookShareButton url={url}>
        <span className="shareButton">
          <FacebookIcon size={44} round />
          <FacebookShareCount url={url}>{shareCount}</FacebookShareCount>
        </span>
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <span className="shareButton">
          <TwitterIcon size={44} round />
        </span>
      </TwitterShareButton>
      <RedditShareButton url={url}>
        <span className="shareButton">
          <RedditIcon size={44} round />
          <RedditShareCount url={url}>{shareCount}</RedditShareCount>
        </span>
      </RedditShareButton>
      <span className="shareButton">
        <EmailShareButton url={url}>
          <span className="shareButton">
            <EmailIcon size={44} round />
          </span>
        </EmailShareButton>
      </span>
    </div>
  );
};
