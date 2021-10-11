const glob = require('glob')
const path = require('path')

module.exports = (app, token) => {
    glob.sync('./*.js').forEach(file => {
        if(!file.includes('route.index.js'))
            require(path.resolve(file))(app, token)
    });
}