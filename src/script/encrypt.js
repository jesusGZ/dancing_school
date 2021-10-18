const MCrypt = require('../config/encriptacion')
const RESPONSE = require('../config/response')
const CONFIG = require('../config/index')

const config = new CONFIG()
const response = new RESPONSE()

class EncryptProcess{
   
    decrypt(cadena){
        return new Promise((resolve, reject) => {
            try {
                const mcrypt = new MCrypt(config.mCryptKey())

                let result = mcrypt.decrypt(cadena)

                resolve(result.replace(/\u0000/g,''))

            } catch (error) {
                reject(error)
            }
        })
    }
    
    encrypt(cadena) {
        return new Promise((resolve, reject) => {
            try {
                const mcrypt = new MCrypt(config.mCryptKey())
        
                let result = mcrypt.encrypt(cadena)
                
                if ((result != null) && ((result.length) >= 44)) return resolve(result)
               
                reject("error")
                
            } catch (error) {
                reject(error)
            }
        })
    }
        
    encryptMethods(data){
        return new Promise(async(resolve, reject) => {
            try {
                let pass
        
                if (data.option == 1) pass = await this.encrypt(data.password)
                
                if(data.option == 2) pass = await this.decrypt(data.password)
                
                if(data.option != 2 && data.option != 1) return reject(response.requestValidation("Opcion no válida"))
                
                resolve(response.success(pass))
                
            } catch (error) {                
                reject(response.process(error, "Ocurrio un error al encriptar/desencriptar"))
            }
        })        
    }
}



module.exports = EncryptProcess