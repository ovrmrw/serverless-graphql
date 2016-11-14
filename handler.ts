import { graphql } from 'graphql';

// import { firebaseApp } from './firebase-initializer';
import { executableSchema, executableSchema2, createLoaders, Context } from './data';



export async function graphqlFn(event, context, callback): Promise<void> {
  const query: string = (event.body && event.body.query) ? event.body.query : `
    {
      users {
        id
        name
        hobby {
          id
          name
        }
        follow {
          id
          name
          follow {
            id
            name
          }
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
      // 'Access-Control-Allow-Origin': '*',
      'Content-Encoding': 'gzip, deflate'
    },
    // requestQuery: query,
    // event,
    // context,
  };

  try {
    const result = await graphql(executableSchema, query, null, contextValue, variables);
    res.statusCode = 200;
    // res.body = JSON.stringify(result);
    res.body = result;
    console.log('res:', res);
    callback(null, res);
  } catch (err) {
    res.statusCode = 400;
    // res.body = JSON.stringify(err);
    res.body = err;
    console.log('res:', res);
    callback(res);
  }
  // graphql(executableSchema, query, null, contextValue, variables)
  //   .then(result => {
  //     firebaseApp.delete();
  //     res.statusCode = 200;
  //     res.body = JSON.stringify(result);
  //     // console.log('callback:', callback);
  //     console.log('res:', res);
  //     callback(null, res);
  //   })
  //   .catch(err => {
  //     res.statusCode = 400;
  //     res.body = JSON.stringify(err);
  //     callback(res);
  //   });
};


interface Response {
  statusCode?: number;
  headers?: {
    [key: string]: string;
    // 'Access-Control-Allow-Origin': string;
  };
  body?: any;
  requestQuery?: string;
  event?: any;
  context?: any;
}
