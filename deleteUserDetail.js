const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });
const commonConfig = {
    TableName: 'userDetail'
}
const deleteUserDetail = (params, callback) => {
    dynamodb.deleteItem(params, function(err, data) {
        if (err) callback(err);
        else callback(null, { ...data, message: "Successfully deleted the entry."});
    });
}

exports.handler = (event, content, callback) => {
    const { path: { type }, querystring: { userId, updatedAt } } = event.params;
    let params = {
        Key: {
            "userId": {
                S: userId
            },
            "updatedAt": {
                S: updatedAt
            }
        },
        ...commonConfig
    }
    deleteUserDetail(params, callback);
};
