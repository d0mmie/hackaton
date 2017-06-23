import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import firebase from 'firebase'
import {MuiThemeProvider} from 'material-ui/styles'
import {Provider} from 'react-redux'
import Store from './redux/store'

const config = {
    apiKey: "AIzaSyAi4LDAXirt_xnXLu5KnypbcVO9rRr_Ju0",
    authDomain: "hackaton-2d427.firebaseapp.com",
    databaseURL: "https://hackaton-2d427.firebaseio.com",
    projectId: "hackaton-2d427",
    storageBucket: "hackaton-2d427.appspot.com",
    messagingSenderId: "621420486419"
  };
  firebase.initializeApp(config);

ReactDOM.render(<Provider store={Store} ><MuiThemeProvider><App /></MuiThemeProvider></Provider> , document.getElementById('root'));
registerServiceWorker();
