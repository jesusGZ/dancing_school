const MCrypt = require('mcrypt').MCrypt
const crypto = require('crypto')


class Encrypt{

    constructor(key){
        this.key = crypto.createHash('md5').update(key).digest('hex')
        this.IV = crypto.createHash('md5').update(this.key).digest('hex')
    }

    encrypt(text){
        let enc = new MCrypt('rijndael-256', 'cbc')

        enc.validateKeySize(false)
        enc.validateIvSize(false)

        enc.open(this.key, this.IV)

        let ciphertext = enc.encrypt(text)
        return ciphertext.toString('base64')
    }

    decrypt(text){
        let dec = new MCrypt('rijndael-256', 'cbc')

        dec.validateKeySize(false)
        dec.validateIvSize(false)

        dec.open(this.key, this.IV)
        
        let plainttext = dec.decrypt(new Buffer.from(text, 'base64'))
        return plainttext.toString()
    }

    encryptSh(text){
        const hash = crypto.createHash('sha256').update(text).digest('hex')

        return hash
    }
}

module.exports = Encrypt