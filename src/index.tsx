import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Game from './Game';
import './index.css';

const root = document.getElementById('root') as HTMLElement | null;
if (root === null) {
  throw new Error('no root element');
}
ReactDOM.render(<Game />, root);
registerServiceWorker();

