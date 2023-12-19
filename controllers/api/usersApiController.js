const db = require('../../database/models')

const userApiController = {
    list: (req, res) => {
        db.Clients.findAll()
            .then(client => {
                console.log(client, "esto es client");
                let respuesta = {
                    meta: {
                        status: 200,
                        total: client.length,
                        url: "/api/users"
                    },
                    data: client
                }
                res.json(respuesta)
            })
    },
    detail: (req, res) => {
        db.Clients.findByPk(req.params.id)
            .then(client => {

                const clientImageUrl = `http://localhost:3000/images/imageUsers/${client.image}`;
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/users/${req.params.id}`
                    },
                    data: {
                        ...client,
                        image: clientImageUrl
      
                    }
                };
                res.json(respuesta);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    }

}



module.exports = userApiController