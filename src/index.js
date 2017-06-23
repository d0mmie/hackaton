import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAi4LDAXirt_xnXLu5KnypbcVO9rRr_Ju0",
    authDomain: "hackaton-2d427.firebaseapp.com",
    databaseURL: "https://hackaton-2d427.firebaseio.com",
    projectId: "hackaton-2d427",
    storageBucket: "hackaton-2d427.appspot.com",
    messagingSenderId: "621420486419"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
