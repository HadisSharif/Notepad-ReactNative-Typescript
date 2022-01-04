import firestore, { firebase } from '@react-native-firebase/firestore';

export const firebaseConfig = {
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  databaseURL: 'DBURL,
  projectId: PROKECT_ID,
  appId: APP_ID,
  storageBucket: 'TORAGEBUCKET,
  messagingSenderId: MESSAGESENDERID
};

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);


firestore().settings({ persistence: true })
export const firebaseDB = firebase.firestore().collection('Users')