const jwt = require('jsonwebtoken')
const CONFIG = require('../config/index')

const config = new CONFIG()
const jwt_secret = config.key()
const expirations = config.jwtExpiration()

function sign({ sub, password }) {
    return new Promise((resolve, reject) => {
        let jwt_expiration;
        
        jwt_expiration = expirations.USER

        const payload = { sub }

        const options = { expiresIn: jwt_expiration }

        jwt.sign(payload, jwt_secret + password, options, (err, token) => {
            if (err) return reject(err)

            resolve(token)
        });
    });
}

function verify(token, password) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwt_secret + password, (err, decoded) => {
            if (err) return reject(err);

            resolve(decoded)
        });
    });
}

function decode(token) {
    return new Promise((resolve) => {
        const decoded = jwt.decode(token, { complete: false })

        resolve(decoded)
    });
}

module.exports = { sign, verify, decode }