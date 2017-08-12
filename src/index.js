import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import '.stylesheets/reset.css';
import '.stylesheets/app.css';
import '.stylesheets/font-awesome/css/font-awesome.min.css';
import '.styleshsets/loader.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
