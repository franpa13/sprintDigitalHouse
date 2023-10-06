const fs = require('fs')
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cookies = require('cookie-parser');




app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const port = 3000

app.listen(port, () => console.log('APP corriendo en el puerto:' + port))


const session  = require("express-session")
app.use(session({
    secret:"mi_secreto",
    resave: false,
    saveUninitialized: true
})
)


//**MIDDLEWARES**//
app.use(cookies())

const userLogged = require("./middlewares/userLogged")
app.use(userLogged)


/******* ROUTERS ******/
const homeRouter = require('./routers/inicio');
const carritodecompraRouter = require('./routers/CarritoDeCompras');
const bibliotecaRouter = require('./routers/biblioteca.js');



app.use('/', homeRouter);
app.use('/biblioteca', bibliotecaRouter)


/**** falta modularizar estos */
app.use("/carrito-de-compra", carritodecompraRouter)

app.use((req, res, next) => {
    const error = {
        link : req.url
    }   
    res.status(404).render("error404", {error : error})
})



