const Product = require('../models/product.js');
const {StatusCodes} = require('http-status-codes');

//Conseguir todos los productos de la empresa 
const getAllProducts = async(req, res) => {
    const products = await Product.find({company: req.company.companyId}).sort('createdAt');//Se ordenarán situando los más viejos primero

    res.status(StatusCodes.OK).json({count: products.length, products});
}

//Crear producto
const createProduct = async (req, res) => {
    req.body.company = req.company.companyId;//Añadir la id de usuario al conjunto de datos recibidos

    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({product});
};

//Actualizar producto
const updateProduct = async(req, res) => {
    //Se obtienen las variables del request
    const {
        body: {name, content},
        company: {companyId},
        params: {id: productId}
    } = req;

    //Se comprueba que la producto tiene un nombre y contenido
    if(name === '' || content === ''){
        throw new BadRequestError('Name or Content fields cannot be empty');
    }

    //Se actualiza según la id de la producto y de la empresa
    const product = await Product.findByIdAndUpdate(
        {
            _id: productId,
            company: companyId
        },
        req.body,
        {
            new: true,
            runValidators: true//Se comprueba que cumpla los requisitos del modelo
        }
    );

    if(!product){//En caso de que no exista una producto con tal id
        throw new NotFoundError(`No Product with ${productId}`);
    }

    res.status(StatusCodes.OK).json({product});
}

//Borado del producto según la id del producto y el usuario.
const deleteProduct = async(req, res) => {
    const {
        company: {companyId},
        params: {id: productId}
    } = req;

    const product = await Product.findOneAndRemove(
        {
            _id: productId,
            company: companyId
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