const auth = require('../config/auth');
const Response = require('../config/response');
const UsuarioProcess = require('../users/users.service');

const response = new Response()
const usuarioProcess = new UsuarioProcess()

function setVerifyTokenMiddleware(middleware) {
    middleware.use(async (req, res, next) => {
        try {
            const { token } = req.headers
            let responseJson
            
            if (!token) {
                responseJson = response.authenticationTK('No se proporciono el token')
                return res.status(responseJson.status).json(responseJson.response)
            }

            const decodedAccessToken = await auth.decode(token)

            if(!decodedAccessToken) {
                throw new Error('Token no valido')
            }

            const datosUsuario = await usuarioProcess.verificacionTokenProcess(decodedAccessToken.sub)

            if (datosUsuario.activo == 0) {
                throw new Error('El usuario no se encuentra activo')
            }
            
            await auth.verify(token, datosUsuario[0].pass)

            req.user = { id: datosUsuario.id }

            next()
        } catch (err) {
            responseJson = response.authenticationTK('Token no válido o expirado')
            return res.status(responseJson.status).json(responseJson.response)
        }
    });
}

module.exports = setVerifyTokenMiddleware