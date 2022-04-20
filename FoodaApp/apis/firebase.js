// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Get web app's Firebase configuration from credentials file
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const credentials_json = require('./credentials.json');
const firebaseConfig = credentials_json['firebaseConfig'];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);