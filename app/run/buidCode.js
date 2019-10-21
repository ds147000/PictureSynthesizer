const {createCanvas, loadImage} = require('canvas')
const path = require('path')
const fs = require('fs')
const errors = require('./error')

function save(path, file) {
    return new Promise((res,rej) => {
        file = file.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
        let buff = Buffer.from(file, 'base64')
        fs.writeFile(path, buff, {encoding: 'utf8'}, (err) => {
            if (err) {
                errors(err)
                rej()
            }
            res(path)
        })    
    })
    
}

module.exports = function (req, res) {
    let canvas = createCanvas(750, 1334)
    let ctx = canvas.getContext('2d')

    loadImage('static/img/qrcode.jpg')
    .then(img => {
        ctx.drawImage(img, 0, 0, 750, 1334)
        return true
    })
    .then(img => {
        return loadImage('static/img/code.jpg')
    })
    .then(img => {
        ctx.drawImage(img, 283, 395, 180, 180)
        // 写入推广码
        ctx.fillStyle = '#ffffff'
        ctx.font = '60px serif'
        ctx.textAlign = 'center'
        ctx.fillText(req.params.code, 375, 750)
        let data = canvas.toDataURL("image/jpeg")
        canvas = null
        ctx  = null
        // 保存图片
        return save(path.join(__dirname, `../../static/code/code_${req.params.code}.jpg`), data)
    })
    .then((path) => {
        // 响应
        res.status(200).sendFile(path)
    })
    .catch(msg => {
        errors(msg)
        res.status(500).send({
            status: 500,
            data: '发生错误，请稍后重试'
        }).end()
    })
}