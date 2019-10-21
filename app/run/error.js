const fs = require('fs')
const path = require('path')

module.exports = function(err) {
    console.error(err)
    fs.writeFile(path.join(__dirname, '../../static/error/' + new Date() + '.txt'), err, () => {
        
    })
}