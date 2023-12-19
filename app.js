const fs = require('fs');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const userLogged = require("./middlewares/userLogged");
const userRoutes = require("./routers/api/userRoutes.js");
const productsRoutes = require("./routers/api/productsRoutes.js");
const genresRoutes = require("./routers/api/genresRoutes.js")

// Agregar el middleware para permitir CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

console.log(cookies);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const port = 3000;

app.listen(port, () => console.log('APP corriendo en el puerto:' + port));

const session = require('express-session');
app.use(
    session({
        secret: 'mi_secreto',
        resave: false,
        saveUninitialized: true,
    })
);

//**MIDDLEWARES**//

app.use(cookies());

app.use(userLogged);

/******* ROUTERS ******/
const homeRouter = require('./routers/inicio');
const carritodecompraRouter = require('./routers/CarritoDeCompras');
const bibliotecaRouter = require('./routers/biblioteca.js');

app.use('/', homeRouter);
app.use('/biblioteca', bibliotecaRouter);

// RUTAS DE APIS
app.use(userRoutes);
app.use(productsRoutes);
app.use(genresRoutes)
/**** falta modularizar estos */
app.use('/carrito-de-compra', carritodecompraRouter);

app.use((req, res, next) => {
    const error = {
        link: req.url,
    };
    res.status(404).render('error404', { error: error });
});
