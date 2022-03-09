const mongoose = require('mongoose');

//Modelado de los productos
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
        trim: true,
        maxLength: [20, 'Name can not be more than 20 characters'],
        minlength: [3, 'Name can not be less than 3 characters']
    },
    recipe: {
        type: String,
        trim: true,
        maxLength: [540, 'Content must be max 240 characters long']
    },
    ingredients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Merchandise',
        required: [true, 'An user must be related to the task']
    },
    unit: {
        type: String,
        enum: ['Liters', 'Kilograms'],
        required: [true, 'Units are mandatory']
    },
    quantity: {
        type: Number,
        min: [0, 'There can\'t be negative quantities'],
        default: 0
    } 
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);