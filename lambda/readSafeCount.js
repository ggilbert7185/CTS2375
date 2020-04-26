const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    await safe().then((data) => {
        callback(null, {
            statusCode: 200,
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
    });
};

function safe() {
    const params = {
      TableName: 'safe',
	  Select: 'COUNT'
    }
    return ddb.scan(params).promise();
}