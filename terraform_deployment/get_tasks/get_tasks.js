const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  console.log('wow');
  const type = event.pathParameters.type;
  if (type === 'all') {
    const params = {
      TableName: 'task-app',
    };
    dynamoDB.scan(params, function (err, data) {
      if (err) {
        callback(err);
      } else {
        const items = data.Items.map((item) => {
          return {
            id: item.taskID.S,
            taskName: item.taskName.S,
            status: item.status.S,
          };
        });
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(items),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    });
  } else if (type === 'single') {
    const params = {
      Key: {
        taskID: {
          S: 'task_0.9274507438101589',
        },
      },
      TableName: 'task-app',
    };
    dynamoDB.getItem(params, function (err, data) {
      if (err) {
        callback(err);
      } else {
        const item = [
          {
            id: data.Item.taskID.S,
            taskName: data.Item.taskName.S,
            status: data.Item.status.S,
          },
        ];
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(item),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    });
  } else {
    callback(null, 'empty');
  }
};
