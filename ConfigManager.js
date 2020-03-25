const filename = './config/credentials.json';
const fs = require('fs');


const getKeys = function () {

    if (fs.existsSync(filename)) {

        var credentials = require(filename);
        var keys = {};
        keys.api_key = credentials.api_key;
        keys.sheet_id = credentials.sheet_id;
        return keys;

    } else {

        var keys = {};
        keys.api_key = process.env.GOOGLE_SHEETS_API_KEY;
        keys.sheet_id = process.env.SHEET_ID;
        return keys;

    }


}

module.exports.getKeys = getKeys;
