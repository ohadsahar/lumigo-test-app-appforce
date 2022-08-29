const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  const { taskName, status } = JSON.parse(event.body);
  const itemToAdd = {
    taskID: {
      S: 'task_' + Math.random(),
    },
    taskName: {
      S: taskName,
    },
    status: {
      S: status,
    },
  };
  const params = {
    Item: itemToAdd,
    TableName: 'task-app',
    ReturnValues: 'ALL_OLD',
  };
  dynamoDB.putItem(params, function (err) {
    if (err) {
      const error = JSON.stringify(err);
      callback(error);
    } else {
      const response = {
        taskID: params.Item.taskID.S,
        taskName: params.Item.taskName.S,
        status: params.Item.status.S,
      };
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  });
};

// import AWS from 'aws-sdk';
// import { APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
// import { Handler } from './types';
// const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });

// const handler: Handler<
//   APIGatewayEvent,
//   APIGatewayProxyStructuredResultV2
// > = async (event, context: any, callback) => {
//   try {
//     const { taskName, status } = JSON.parse(event.body || '');
//     const itemToAdd = {
//       taskID: {
//         S: 'task_' + Math.random(),
//       },
//       taskName: {
//         S: taskName,
//       },
//       status: {
//         S: status,
//       },
//     };
//     const params = {
//       Item: itemToAdd,
//       TableName: 'task-app',
//       ReturnValues: 'ALL_OLD',
//     };
//     dynamoDB.putItem(params, function (err: any) {
//       if (err) {
//         const error = JSON.stringify(err);
//         callback(error);
//       } else {
//         const response = {
//           taskID: params.Item.taskID.S,
//           taskName: params.Item.taskName.S,
//           status: params.Item.status.S,
//         };
//         callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(response),
//           headers: { 'Content-Type': 'application/json' },
//         });
//       }
//     });
//   } catch (error) {
//     callback(null, {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error' }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// };

// exports.handler = handler;

// // eslint-disable-next-line camelcase
// export const create_task = {
//   handler,
// };
