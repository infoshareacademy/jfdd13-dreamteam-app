import firebase from "firebase";

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID
} = process.env;

const firebaseConfig = {
    apiKey: "AIzaSyAGSS1np6fS7NyjFAwcNqJS-S7yWxChGKA",
    authDomain: "dreamteam-app.firebaseapp.com",
    databaseURL: "https://dreamteam-app.firebaseio.com",
    projectId: "dreamteam-app",
    storageBucket: "dreamteam-app.appspot.com",
    messagingSenderId: "881384616213",
    appId: "1:881384616213:web:6061ea9c9b633e5a9c791c"
  };

firebase.initializeApp(firebaseConfig);