const fs = require('fs')
const errors = require('./error')
const paths = require('path')

function exists (path) {
    return fs.existsSync(path)
}

module.exports = function(req, res, netx) {
    let path = paths.join(__dirname, `../../static/code/code_${req.params.code}.jpg`)
    if (exists(path)) {
        res.status(200).sendFile(path)
        return
    } else {
        netx()
    }
}