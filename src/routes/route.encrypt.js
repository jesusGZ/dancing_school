const encryptController = require("../../controller/encrypt")
const encryptCont = new encryptController()
const Validations = require('../../model/constans/validation')
const validations = new Validations()
const validationReq = require('../util/middleware/request')
const response = require('../../model/constans/response')
const resp = new response()

module.exports = (app) =>{
    app.post('/tools/encrypt', validationReq(0, 2), (request, response) =>{
        let { option, password } = request.body
        
        if (!(validations.tryOut({option}, validations.regularExp().numeros, 40) || option > 2 || option < 1)) {
            return resp.send(response, resp.requestValidation('Parámetros incorrectos'))
        }
               
        encryptCont.encryptMethods({option, password}).then((result) =>{
            resp.send(response, result)
        }).catch((error) =>{
            resp.send(response, error)
        });
    });
} 
