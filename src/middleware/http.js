const RESPONSE = require('../config/response')
const response = new RESPONSE()
const VERBOS = ['GET', 'POST', 'PUT', 'OPTIONS']

function methodsHttp(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', `Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method`)
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('access-control-expose-headers', 'token')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    
    if(req.method){
        let method_valid = undefined
        method_valid = VERBOS.find(metodo => metodo == req.method)

        if(method_valid == undefined){
            let error = {response: {code: 99, data: 'Metodo de petición no valido', message: "Error de petición"}, status: 405}
            response.send(res, error)
        }else{
            next()
        }
    }
}

module.exports = methodsHttp