const fs = require('fs');
const path = require('path');

const libros = require('../baseDatos/libros');
const librosPath = path.join(__dirname, '../baseDatos/libros.json')
console.log(librosPath)
const db = require("../database/models")


const bibliotecaController = {
    /**** BIBLIOTECA ****/

    
    render: (req, res) => {
        db.Products.findAll({include: [
            {
                model: db.Genres, 
                as: 'Genres', 
                attributes: ['name']
            }
        ]})
            .then((libros) => {

                res.render("biblioteca", { datos: libros })
            })
    },
    /**** CREAR ****/
    renderCrearProductos: (req, res) => {
        res.render('CreacionDeProductos')
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

        const editLibro = libros.find((libro) => libro.id === id)

        res.render('ModificarProductos', { editar: editLibro })
    },
    editando: (req, res) => {
        const { id } = req.params;

        const editando = libros.find((libro) => libro.id === id)

        const indexLibro = libros.indexOf(editando)

        console.log(req.body)
        libros[indexLibro] = {
            id: editando.id,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            genero: req.body.genero,
            img: req.file?.filename || "default.png",
            autor: req.body.autor,
            precio: req.body.precio,
            editorial: req.body.editorial,
            idioma: req.body.idioma,
            cantidad: req.body.cantidad,
        }

        fs.writeFileSync(librosPath, JSON.stringify(libros));


        res.redirect('/biblioteca');
    },
    /**** Eliminar ****/
    eliminar: (req, res) => {
        const { id } = req.params;

        const nuevaLista = libros.filter((libro) => libro.id !== id);

        fs.writeFileSync(librosPath, JSON.stringify(nuevaLista));

        const nuevoListaDeLibros = JSON.parse(fs.readFileSync(librosPath, "utf-8"));

        res.render("biblioteca", { datos: nuevoListaDeLibros })
    }
}

module.exports = bibliotecaController;