import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './reset.css';
import './App.css';
import './Loader.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
