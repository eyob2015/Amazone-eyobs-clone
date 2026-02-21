// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4y5iBPZH7J0T17WUHT9kHaSNWmjToxRs",
  authDomain: "e-eyobsisay.firebaseapp.com",
  projectId: "e-eyobsisay",
  storageBucket: "e-eyobsisay.appspot.com",
  messagingSenderId: "146430515974",
  appId: "1:146430515974:web:5a0b7d441b3863dc05dc87",
  measurementId: "G-WE16D46BMG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = app.firestore()


export {auth,db}