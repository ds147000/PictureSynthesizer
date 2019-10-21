exports.setOrigin = function (req, res, netx) {
    res.set('Access-Control-Allow-Origin', '*')
    res.type('jpeg')
    netx()
}