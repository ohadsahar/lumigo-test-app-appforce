const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const id = body.id;
  const taskName = { S: body.taskName };
  const statusValue = { S: body.status };
  const params = {
    TableName: 'task-app',
    Key: {
      taskID: {
        S: id,
      },
    },
    UpdateExpression: 'SET taskName=:taskName, #my_status_value=:status',
    ExpressionAttributeValues: {
      ':taskName': taskName,
      ':status': statusValue,
    },
    ExpressionAttributeNames: {
      '#my_status_value': 'status',
    },
    ReturnValues: 'ALL_NEW',
  };

  dynamoDB.updateItem(params, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  });
};
