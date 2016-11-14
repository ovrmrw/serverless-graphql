import { graphql } from 'graphql';
import { executableSchema, executableSchema2 } from './data';
import gql from 'graphql-tag';
import './firebase-initializer';


const handler = (event, context, callback) => {
  const query = (event.body && event.body.query) ? event.body.query : `
    {
      test
    }
  `;

  const variables = (event.body && event.body.variables) ? event.body.variables : null;

  graphql(executableSchema2, query, null, {}, variables)
    .then((response) => {
      const res: any = {};
      res.statusCode = 200;
      res.headers = {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      };
      res.body = response;
      res.requestQuery = query;
      callback(null, res);
    })
    .catch((error) => callback(error));
};

export { handler };