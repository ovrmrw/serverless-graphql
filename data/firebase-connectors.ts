// import * as firebase from 'firebase';
import * as lodash from 'lodash';
import * as fetch from 'isomorphic-fetch';
// const assert = require('power-assert');

import { User, Hobby } from './schema';


export async function getUserIdsConnector(): Promise<string[]> {
  // const snapshot = await firebase.database().ref('users').once('value') as Snapshot;
  const users: User[] = await fetch('https://graphql-e5abf.firebaseio.com/users.json')
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json() as Promise<User[]>;
    })
    .then(users => users.filter(user => !!user));
  // users.forEach(user => assert(lodash.isObject(user) && 'id' in user));
  const ids: string[] = users.filter(obj => !!obj).map(user => user.id);
  return ids;
}


export async function getUsersConnector(keys: string[]): Promise<User[]> {
  // const snapshotPromises = keys.map(key => firebase.database().ref('users/' + key).once('value') as Promise<Snapshot>);
  const userPromises = keys.map(key => {
    return fetch(`https://graphql-e5abf.firebaseio.com/users/${key}.json`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json() as Promise<User>;
      });
  });
  const users = await Promise.all(userPromises);
  // users.forEach(user => assert(lodash.isObject(user) && 'id' in user));
  console.log('userLoader fetch:', ...users.map(user => ({ id: user.id, name: user.name })));
  return users;
}


export async function getHobbiesConnector(keys: string[]): Promise<Hobby[]> {
  // const snapshotPromises = keys.map(key => firebase.database().ref('hobby/' + key).once('value') as Promise<Snapshot>);
  const hobbyPromises = keys.map(key => {
    return fetch(`https://graphql-e5abf.firebaseio.com/hobby/${key}.json`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json() as Promise<Hobby>;
      });
  });
  const hobbies = await Promise.all(hobbyPromises);
  // hobbies.forEach(hobby => assert(lodash.isObject(hobby) && 'id' in hobby));
  console.log('hobbyLoader fetch:', ...hobbies.map(hobby => ({ id: hobby.id, name: hobby.name })));
  return hobbies;
}



// type Snapshot = firebase.database.DataSnapshot;
