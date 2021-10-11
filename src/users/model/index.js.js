const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: Schema.ObjectId,
    nombre: { 
        type: String, required: true 
    },
    correo: { 
        type: String, required: true 
    },
    nick: { 
        type: String, unique: true, required: true 
    },
    pass: { 
        type: String, required: true 
    },
    //role: { type: String, required: true }
});

let model = mongoose.model('User', mySchema);

module.exports = model;