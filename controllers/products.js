const Product = require('../models/product.js');
const {StatusCodes} = require('http-status-codes');

//Conseguir todos las notas del usuario 
const getAllProducts = async(req, res) => {
    const products = await Product.find({user: req.user.userId}).sort('createdAt');//Se ordenarán situando los más viejos primero

    res.status(StatusCodes.OK).json({count: products.length, products});
}

//Crear nota
const createProduct = async (req, res) => {
    req.body.user = req.user.userId;//Añadir la id de usuario al conjunto de datos recibidos

    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({product});
};

//Actualizar nota
const updateProduct = async(req, res) => {
    //Se obtienen las variables del request
    const {
        body: {name, content},
        user: {userId},
        params: {id: productId}
    } = req;

    //Se comprueba que la nota tiene un nombre y contenido
    if(name === '' || content === ''){
        throw new BadRequestError('Name or Content fields cannot be empty');
    }

    //Se actualiza según la id de la nota y del usuario
    const product = await Product.findByIdAndUpdate(
        {
            _id: productId,
            user: userId
        },
        req.body,
        {
            new: true,
            runValidators: true//Se comprueba que cumpla los requisitos del modelo
        }
    );

    if(!product){//En caso de que no exista una nota con tal id
        throw new NotFoundError(`No Product with ${productId}`);
    }

    res.status(StatusCodes.OK).json({product});
}

//Borado de la nota según la id de la nota y el usuario.
const deleteProduct = async(req, res) => {
    const {
        user: {userId},
        params: {id: productId}
    } = req;

    const product = await Product.findOneAndRemove(
        {
            _id: productId,
            user: userId
        }
    );

    if(!product){
        throw new NotFoundError(`No Product with ${productId}`);
    }

    res.status(StatusCodes.OK).json();
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}