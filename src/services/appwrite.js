// appwrite.js
import { Account, AppwriteException, Client } from 'appwrite';

const appwrite = new Account(); // or use Client if that's what you need

appwrite.setEndpoint('https://cloud.appwrite.io/v1');
appwrite.setProject('546e1db0d13aac19d4b');
appwrite.setKey('a506802d0511184152754d336fa259df551f29e09c74765f8f6c39f9475f05e98280a831c1b9f0fd9c2d7f82a4bf091764149a3199b20ae8a2118eb3247c93473783aa196b2038fe39ad7bbfda32103cf93b8510857433713abcb76fe93a0e60f34a9db5276be232e4f57cbf07ed0874d91829bcd09571fb99f0dfef965bd9de');

export {
  appwrite,
  Account,
  AppwriteException,
  Client,
  // Add other exports if needed
};
