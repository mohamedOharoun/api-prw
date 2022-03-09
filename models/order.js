const mongoose = require('mongoose');

//Modelado de las notas
const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
        trim: true,
        maxLength: [20, 'Name can not be more than 20 characters'],
        minlength: [3, 'Name can not be less than 3 characters']
    },
    client: {
        identification: String,
        telephone: String,
        email: String
    },
    quantity: {
        type: Number,
        default: 0
    } 
}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);