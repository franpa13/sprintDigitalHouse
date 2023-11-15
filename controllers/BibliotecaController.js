const fs = require('fs');
const path = require('path');




const db = require("../database/models")


const bibliotecaController = {
    /**** BIBLIOTECA ****/


    render: (req, res) => {
        db.Products.findAll({
            include: [
                {
                    model: db.Genres,
                    as: 'Genres',
                    attributes: ['name']
                }
            ]
        })
            .then((libros) => {

                res.render("biblioteca", { datos: libros })
            })
    },
    /**** CREAR ****/
    renderCrearProductos: (req, res) => {
        db.Genres.findAll()
        .then((genre)=>{
            res.render('CreacionDeProductos',{genre})

        })     
    },
    crear: async (req, res) => {
        const genre = await db.Genres.findOne({ where: { name: req.body.genero } });
        const nuevoLibro = await db.Products.create(
            {

                title: req.body.titulo,
                description: req.body.descripcion,
                id_genre: genre ? genre.id : null, // Usar el ID del género encontrado o null si no se encuentra
                image: req.file?.filename || "default.png",
                autor: req.body.autor,
                price: parseFloat(req.body.precio),
                editorial: req.body.editorial,
                language: req.body.idioma,
                stock: parseInt(req.body.cantidad),
            })



        // libros.push(nuevoLibro);

        // fs.writeFileSync(librosPath, JSON.stringify(libros));

        res.redirect("/biblioteca")
    },
    /**** DETALLE ****/
    renderDetalle: (req, res) => {
        const { id } = req.params;
        db.Products.findByPk(id) // Busca un producto por su ID
            .then((libro) => {
                if (libro) {
                    res.render('detalle-producto', { libroLista: libro });
                } else {
                    // Manejar el caso en el que no se encontró el producto con el ID dado
                    res.status(404).send("Producto no encontrado");
                }
            })
            .catch((err) => {
                console.log("Error en el servidor: ", err);
                res.status(500).send("Error en el servidor");
            });
    },

    /**** EDITAR ****/
    rendermodificarProductos: (req, res) => {
        const { id } = req.params;
    
        // Obtén todos los géneros de la base de datos
        db.Genres.findAll()
            .then((generos) => {
                // Luego, obtén el libro que deseas editar
                db.Products.findByPk(id, {
                    include: "Genres",
                })
                    .then((libro) => {
                        res.render('ModificarProductos', { editar: libro, generos });
                    })
                    .catch((err) => {
                        console.log("Error en el servidor: ", err);
                        res.status(500).send("Error en el servidor");
                    });
            })
            .catch((err) => {
                console.log("Error en el servidor: ", err);
                res.status(500).send("Error en el servidor");
            });
    },
    

    editando: async (req, res) => {
        const { id } = req.params;

        const generoName = req.body.genero;
        const genero = await db.Genres.findOne({ where: { name: generoName } });
        
        if (!genero) {
          console.error('El género seleccionado no es válido.');
          res.status(400).send('El género seleccionado no es válido.');
          return;
        }
  
        const nuevosValores = {
            title: req.body.titulo,
            description: req.body.descripcion,
            id_genre: genero.id, // Utiliza el valor de género verificado
            image: req.file?.filename || "default.png",
            autor: req.body.autor,
            price: req.body.precio,
            editorial: req.body.editorial,
            language: req.body.idioma, // Asegúrate de que el nombre del campo sea 'language'
            stock: req.body.cantidad,
        };
    
        // Define la condición para encontrar el producto que deseas editar
        const condicion = {
            where: { id: id }, // Condición basada en el 'id' del producto
        };
    
        // Llama a update para modificar el producto
        db.Products.update(nuevosValores, condicion)
            .then(() => {
                res.redirect('/biblioteca');
            })
            .catch(error => {
                console.error('Error al actualizar el producto:', error);
                // Maneja el error apropiadamente, por ejemplo, renderizando una vista de error.
                res.status(500).send('Error al actualizar el producto');
            });
    
    },
    

    /**** Eliminar ****/
    eliminar: (req, res) => {
        const { id } = req.params;
     

     
        const productoId = id;
        
        // Utiliza el método `destroy` para eliminar el producto por su ID
        db.Products.destroy({
          where: {
            id: productoId
          }
        })
          .then(() => {
           res.redirect("/biblioteca")
          })
          .catch((error) => {
            console.error('Error al eliminar el producto:', error);
            // Maneja el error apropiadamente, por ejemplo, renderizando una vista de error.
          });
        
        // const nuevaLista = libros.filter((libro) => libro.id !== id);

        // fs.writeFileSync(librosPath, JSON.stringify(nuevaLista));

        // const nuevoListaDeLibros = JSON.parse(fs.readFileSync(librosPath, "utf-8"));

        // res.render("biblioteca", { datos: nuevoListaDeLibros })
    }
}

module.exports = bibliotecaController;