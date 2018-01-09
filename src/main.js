import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

const initialState = window.__APP_INITIAL_STATE__;
const element = <App {...initialState} />;

ReactDOM.hydrate(element, document.querySelector('#root'));
