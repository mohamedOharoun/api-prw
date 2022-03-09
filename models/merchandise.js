const mongoose = require('mongoose');

//Modelado de las materias primas
const MerchandiseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name must be provided'],
        trim: true,
        maxLength: [20, 'Name can not be more than 20 characters'],
        minlength: [3, 'Name can not be less than 3 characters']
    },
    unit: {
        type: String,
        enum: ['Liters', 'Kilograms'],
        required: [true, 'Units are mandatory']
    },
    quantity: {
        type: Number,
        default: 0
    } 
}, {timestamps: true});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);