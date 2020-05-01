const util = require('./util.js');
const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });

exports.handler = (event, content, callback) => {
    const { name, updatedAt, email, status  } = event.body;
    const params = {
        Item : {
            "userId": {
                S: util.guid(),
            },
            "name": {
                S: name
            },
            "updatedAt": {
                S: updatedAt
            },
            "email": {
                S: email
            },
            "status": {
                S: status   
            }
        },
        TableName: 'userDetail'
    }
    
    dynamodb.putItem(params, function(error,data){
        if (error) {
            console.log(error, ...event);
            callback(error);
        } else callback(null, { ...event,...data, message: 'Successfully created the entry.' });
    });
};