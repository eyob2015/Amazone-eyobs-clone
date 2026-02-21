import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
 // baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
    // "http://localhost:5001/challenge-4b2b2/us-central1/api",
    baseURL: 'https://amzone-backen.onrender.com', // Update with your server URL
});

export default instance;


