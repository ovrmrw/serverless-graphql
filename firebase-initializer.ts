import * as firebase from 'firebase';
import * as path from 'path';


const root = path.resolve();
const secretJsonPath = path.join(root, 'secret.json');
console.log('Secret JSON Path:', secretJsonPath);


export const firebaseApp = firebase.initializeApp({
  serviceAccount: secretJsonPath,
  databaseURL: "https://graphql-e5abf.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: 'restricted-uid'
  }
});
