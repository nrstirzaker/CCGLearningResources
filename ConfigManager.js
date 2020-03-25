const filename = './config/credentials.json';
const fs = require('fs');


const getKeys = function () {

    if (fs.existsSync(filename)) {

        var credentials = require(filename);
        var keys = {};
        keys.private_key = credentials.private_key;
        keys.client_email = credentials.client_email;
        keys.sheet_id = credentials.sheet_id;
         return keys;

    } else {

        var keys = {};
        keys.private_key = process.env.private_key;
        keys.client_email = process.env.client_email;
        keys.sheet_id = process.env.sheet_id;
        return keys;

    }


}

module.exports.getKeys = getKeys;
