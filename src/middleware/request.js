module.exports = function middleware(lengthQ, lengthB) {
    function requestValidation(req, res, next) {
        tryOutReq(req, res, lengthQ, lengthB)
            .then(result => next())
            .catch(error => error)
    }

    return requestValidation
}

function tryOutReq(req, res, lengthQ, lengthB) {
    return new Promise((resolve, reject) => {
        if (Object.keys(req.query).length > lengthQ || Object.keys(req.body).length > lengthB) {
            return reject(res.status(400).json({code: 20, data: 'S/R', message: 'Parámetros incorrectos'}))
        }

        resolve(1)
    })
}