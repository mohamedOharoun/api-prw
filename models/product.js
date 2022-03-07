const mongoose = require('mongoose');

//Modelado de las notas
const TaskSchema = new mongoose.Schema({
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
    } 
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);