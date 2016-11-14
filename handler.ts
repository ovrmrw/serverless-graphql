import 'core-js';
import { graphql } from 'graphql';

import { firebaseApp } from './firebase-initializer';
import { executableSchema, executableSchema2, createLoaders, Context } from './data';



const graphqlFn = (event, context, callback): void => {
  const query: string = (event.body && event.body.query) ? event.body.query : `
    {
      user(id:1) {
        id
        name
        hobby {
          id
          name
        }
      }
    }
  `;
  // const query: string = (event.body && event.body.query) ? event.body.query : `
  //   {
  //     test
  //   }
  // `;

  const variables: {} = (event.body && event.body.variables) ? event.body.variables : null;

  const contextValue: Context = {
    loaders: createLoaders()
  };

  console.log('query:', query);
  console.log('variables:', variables);
  console.log('contextValue:', contextValue);

  const res: Response = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    // requestQuery: query,
    // event,
    // context,
  };


  graphql(executableSchema, query, null, contextValue, variables)
    .then(result => {
      firebaseApp.delete();
      res.statusCode = 200;
      res.body = JSON.stringify(result);
      // console.log('callback:', callback);
      console.log('res:', res);
      callback(null, res);
    })
    .catch(err => {
      res.statusCode = 400;
      res.body = JSON.stringify(err);
      callback(res);
    });
};

export { graphqlFn };


interface Response {
  statusCode?: number;
  headers?: {
    [key: string]: string;
    'Access-Control-Allow-Origin': string;
  };
  body?: any;
  requestQuery?: string;
  event?: any;
  context?: any;
}
