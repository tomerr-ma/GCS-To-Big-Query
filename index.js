'use strict'

const { BigQuery } = require('@google-cloud/bigquery')
const { Storage } = require('@google-cloud/storage')

async function gcsbq (file, context) {
  const _schema = require(process.env.SCHEMA)

  const datasetId = process.env.DATASET

  var date = new Date();
  var day = date.getDate();

  var dayStr = "" + day;
  if (day < 10) {
	dayStr = "0" + day
  }

  var monthStr = "" + (date.getMonth()+1);

  if ((date.getMonth()+1) < 10) {
	monthStr = "0" + monthStr
  }

  var todayStr = date.getFullYear() + monthStr + dayStr;

  const tableId = (process.env.TABLE + '_' + todayStr);
  const bucketName = process.env.BUCKET_NAME

  console.log("table name: " + tableId);

  const bigquery = new BigQuery()

  const storage = new Storage()



  const filename = storage.bucket(bucketName).file("logs/"+todayStr+"/*")

  /* Configure the load job and ignore values undefined in schema */
  const metadata = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON',
    schema: {
      fields: _schema
    },
    ignoreUnknownValues: true
  }

  const dataset = bigquery.dataset(datasetId)

  await dataset.get({ autoCreate: true }, (e, dataset, res) => {
    if (e) console.log(e)
    dataset.table(tableId).get({ autoCreate: true }, (e, table, res) => {
      table.load(filename, metadata).then(function(data) {
        table.query(query)
        bucket.deleteFiles(function(err) {});
       });
    })
  })
}
exports.gcsbq = gcsbq
