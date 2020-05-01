const postUserDetailTestObject = {
  "body": {
    "name": "test",
    "status": "test-status",
    "email": "test@demo.com",
    "updatedAt": "21121212"
  }
}

const getUserDetailTestObject = {
  "params": {
    "path": {
      "type": "all"
    }
  }
}

const putUserDetailTestObject = {
  "body": {
    "email": "sajan",
    "status": "pass",
    "name": "sajan dsad sa"
  },
  "userId": "2800e5829a1b2d9793423c4220200430",
  "updatedAt": "sdad"
}

const deleteUserDetailTestObject = {
  "params": {
    "path": {
      "type": "all"
    },
    "querystring": {
      "userId": "2800e5829a1b2d9793423c4220200430",
      "updatedAt": "sdad"
    }
  }
}