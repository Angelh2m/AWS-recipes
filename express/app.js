const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.status(200).json({
    message: 'ok',
  })
})

module.exports.handler = serverless(app);