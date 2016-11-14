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
      const res: Response = {};
      res.statusCode = 200;
      res.headers = {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      };
      res.body = JSON.stringify(response);
      res.requestQuery = query;
      res.event = event;
      res.context = context;
      callback(null, res);
    })
    .catch((error) => callback(error));
};

export { handler };


interface Response {
  statusCode?: number;
  headers?: {
    'Access-Control-Allow-Origin': string;
  };
  body?: string;
  requestQuery?: string;
  event?: any;
  context?: any;
}