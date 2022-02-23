const csvToJson = require('convert-csv-to-json');

const db = {
  teams: [],
  people: [],
  roles: [],
  softwares: [],
  equipments: [],
  supplies: []
};

Object.keys(db).forEach((key: string) => {
  db[key] = [
    ...db[key], 
    ...csvToJson.fieldDelimiter(',')
      .getJsonFromCsv(`./data-in-csv/${key}.csv`)
  ]
  if (db[key].length > 0) {
    const firstItem = db[key][0];
    Object.keys(firstItem).forEach((itemKey: string) => {
      if (db[key].every((item) => {
        return /^-?\d+$/.test(item[itemKey])
      })) {
        db[key].forEach((item) => {
          item[itemKey] = Number(item[itemKey])
        })
      }
    })
  }
})

module.exports = db;