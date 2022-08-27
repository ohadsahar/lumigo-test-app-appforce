const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  const { type } = JSON.parse(event?.body);
  if (type === 'all') {
    const params = {
      TableName: 'task-app',
    };
    dynamoDB.scan(params, function (err, data) {
      callback(null, data);
      if (err) {
        callback(err);
      } else {
        data.Items.forEach((item) => {
          const params = {
            Key: {
              taskID: {
                S: item.taskID.S,
              },
            },
            TableName: 'task-app',
          };
          dynamoDB.deleteItem(params, function (err) {
            if (err) {
              callback(err);
            } else {
              callback(null, {
                statusCode: 200,
                body: JSON.stringify({ message: 'Delete successfully' }),
                headers: { 'Content-Type': 'application/json' },
              });
            }
          });
        });
      }
    });
  } else {
    const { id } = JSON.parse(event?.body);
    const params = {
      Key: {
        taskID: {
          S: id,
        },
      },
      TableName: 'task-app',
    };
    dynamoDB.deleteItem(params, function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Delete successfully' }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    });
  }
};
