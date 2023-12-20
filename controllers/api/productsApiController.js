const db = require('../../database/models');

const productsApiController = {
    list: (req, res) => {
        db.Products.findAll({
            include: [
                {
                    model: db.Genres,
                    as: 'Genres',
                    attributes: ['name']
                }
            ]
        })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: "/api/products"
                    },
                    data: products
                };
                res.json(respuesta);
            })
            .catch(error => {
                console.error("Error al obtener la lista de productos:", error);
                res.status(500).json({
                    meta: {
                        status: 500,
                        error: "Internal Server Error"
                    }
                });
            });
    },

    detail: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    // Si el producto no se encuentra, devolver un error 404
                    return res.status(404).json({
                        meta: {
                            status: 404,
                            error: "Product not found"
                        }
                    });
                }

                console.log("esto es product", product.image);

                const productImageUrl = `http://localhost:3000/images/${product.image}`;
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/products/${req.params.id}`
                    },
                    data: {
                        ...product,
                        image: productImageUrl
                    }
                };
                res.json(respuesta);
            })
            .catch(error => {
                console.error("Error al obtener el detalle del producto:", error);
                res.status(500).json({
                    meta: {
                        status: 500,
                        error: "Internal Server Error"
                    }
                });
            });
    }
};

module.exports = productsApiController;
