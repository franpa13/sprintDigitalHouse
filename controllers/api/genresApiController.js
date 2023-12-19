const db = require('../../database/models')

const genresApiController = {
    list: (req, res) => {
        db.Genres.findAll()
            .then(genre => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: genre.length,
                        url: "/api/genres"
                    },
                    data: genre
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


}
module.exports = genresApiController