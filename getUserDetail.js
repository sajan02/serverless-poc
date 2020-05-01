const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });

const commonConfig = {
    TableName: 'userDetail'
}

const transformUserDetailData = (entry) => {
    return { userId: entry.userId.S, name: entry.name.S, status: entry.status.S, updatedAt: entry.updatedAt.S, email: entry.email.S }
}

const getAll = (callback) => {
    dynamodb.scan(commonConfig, function(error,data){
        if (error) {
            console.log(error);
            callback(error);
        } else {
            const {Count, ScannedCount, Items} = data;
            const tranformData = Items.map(entry => transformUserDetailData(entry))
            callback(null, { Count, ScannedCount, list: tranformData, message: 'Success.' });
        }
    })
}

const getSpecificEntry = (params, callback) => {
    dynamodb.getItem(params, function(error,data){
        if (error) {
            callback(error);
        } else callback(null, {...data, message: 'Success.' });
    })
}

exports.handler = (event, content, callback) => {
    const {params: { path }} = event;
    if(path.type === 'all') {
        getAll(callback);
    } else if (path.type === 'single') {
        let params = {
            Key: {
                "userId": {
                    S: "saj"
                },
                "updatedAt": {
                    S: "sd"
                }
            },
            ...commonConfig
        }
        getSpecificEntry(params, callback)
    } else {
        callback(null, { ...event,"message": "bad request"})
    }
};