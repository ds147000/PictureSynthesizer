const buidCode = require('./run/buidCode')
const getCode = require('./run/getCode')
const express = require('express')
const sendHeader = require('./run/header')

const app = express()

app.get('/getCode/:code', [sendHeader.setOrigin , getCode, buidCode])

app.all(/[^getCode]\d/, (req, res) => {
    res.status(200).send('请求错误')
})

module.exports = app