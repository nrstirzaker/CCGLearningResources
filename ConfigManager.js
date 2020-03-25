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
        keys.private_key = process.env.GOOGLE_ACCNT_PRIVATE_KEY;
        keys.client_email = process.env.CLIENT_EMAIL;
        keys.sheet_id = process.env.SHEET_ID;
        return keys;

    }


}

module.exports.getKeys = getKeys;
