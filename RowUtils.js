const getRowAsJson = function (spreadSheetRow) {
    const rowOutput = {};
    const rows = [];
    const Topic = spreadSheetRow.Topic;
    const URL = spreadSheetRow.URL;
    const Notes = spreadSheetRow.Notes;
    const rowNumber = spreadSheetRow.rowNumber - 1;
    rowOutput["row" + rowNumber] = {Topic,URL,Notes}
    return rowOutput;
}


module.exports.getRowAsJson = getRowAsJson;

