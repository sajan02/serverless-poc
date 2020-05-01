const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });
const commonConfig = {
    TableName: 'userDetail'
}

const transformUserDetailData = (entry) => {
    return { name: entry.name.S, status: entry.status.S, updatedAt: entry.updatedAt.S, email: entry.email.S }
}

const updateUserDetail = (params, callback) => {
    dynamodb.updateItem(params, function(error,data){
        if (error) {
            console.log(error);
            callback(error);
        } else callback(null, {...transformUserDetailData(data.Attributes), statusCode: 200 });
    })
}

exports.handler = (event, content, callback) => {
    const {body : { email, status , name }, userId, updatedAt } = event;
    let params = {
        ExpressionAttributeNames: {
            "#A": "status",
            "#B": "name",
            "#C": "email",
        }, 
        ExpressionAttributeValues: {
            ":a": {
                S: status
            },
            ":b": {
                S: name
            },
            ":c": {
                S: email
            }
        }, 
        Key: {
            "userId": {
                S: userId
            },
            "updatedAt": {
                S: updatedAt
            }
        },
        ReturnValues: "ALL_NEW", 
        UpdateExpression: "SET #A = :a, #B = :b, #C = :c",
        ...commonConfig
    };
    updateUserDetail(params, callback);
};

