const getRowAsJson = function (spreadSheetRow) {
    const rowOutput = {};
    rowOutput.RowId = spreadSheetRow.rowNumber - 1;
    rowOutput.Topic = spreadSheetRow.Topic;
    rowOutput.Name = spreadSheetRow.Name;
    rowOutput.Address = spreadSheetRow.URL;
    rowOutput.Notes = spreadSheetRow.Notes;
    return rowOutput;
}


module.exports.getRowAsJson = getRowAsJson;

