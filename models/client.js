const mongoose = require('mongoose');

//Modelado de las materias primas
const ClientSchema = new mongoose.Schema({
    cif: {
        type: String,
        unique: true,
        required: [true, 'cif must be provided'],
        trim: true,
        maxLength: [9, 'cif can not be more than 9 characters'],
        minlength: [9, 'cif can not be less than 9 characters']
    },
    name: {
        type: String,
        required: [true, 'Units are mandatory']
    },
    email: {
        type: String
    } 
}, {timestamps: true});

module.exports = mongoose.model('Client', ClientSchema);