const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('<1MbmrTRl8eOcAKaG_NFsAaIPQcyYuJKnjnbr91K1FpdM>');

doc.useApiKey('YOUR-API-KEY');
 
await doc.loadInfo();

const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
console.log(sheet.title);
console.log(sheet.rowCount);
 
// use service account creds
// await doc.useServiceAccountAuth({
//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   private_key: process.env.GOOGLE_PRIVATE_KEY,
// });
// // OR load directly from json file if not in secure environment
// await doc.useServiceAccountAuth(require('./creds-from-google.json'));
// // OR use API key -- only for read-only access to public sheets
// doc.useApiKey('YOUR-API-KEY');
 