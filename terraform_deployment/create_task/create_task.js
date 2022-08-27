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
