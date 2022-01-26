import { API_KEY, DATABSE_URL, CLIENT_ID, APP_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID } from '@env';
import firestore, { firebase } from '@react-native-firebase/firestore';


export const firebaseConfig = {
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  databaseURL: DATABSE_URL,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  projectId: 'colorifynote1',
  appId: APP_ID,
};

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);


firestore().settings({ persistence: true })
export const firebaseDB = firebase.firestore().collection('Users')