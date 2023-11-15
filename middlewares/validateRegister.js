const db = require("../database/models");
const { body, validationResult } = require("express-validator");
const { hashSync, compareSync } = require("bcryptjs");

const arrRegister = [
    body("NombreUsuario").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
    body("Email").notEmpty().withMessage("Debes ingresar tu email").bail().isEmail().withMessage("Debes ingresar un formato de email válido"),
    body("password").notEmpty().withMessage(`Debes ingresar tu password`),
    body("rePassword").notEmpty().withMessage("Debes repetir la contraseña"),
];

const validateRegister = async (req, res, next) => {
    // const email = req.body.Email; 

    // res.cookie('Email', email, { maxAge: 900000, httpOnly: true });

    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            throw errors;
        }
    } catch (err) {
        return res.render("registrarse", {
            errors: err.mapped(),
            old: req.body
        });
    }

    try {
        const hashing = hashSync(req.body.password, 10);
        const comparacion = compareSync(req.body.rePassword, hashing);

        if (comparacion) {
            // Crear un nuevo usuario en la base de datos
            const newUser = await db.Clients.create({
                email: req.body.Email,
                password: hashSync(req.body.password, 10),// Usar el hash del password
                username: req.body.NombreUsuario,
                image: req.file.filename,

            });


            // Puedes asignar valores de la sesión aquí si lo deseas
            // req.session.userLogged = newUser;

            next();
        } else {
            throw "confirmar la contraseña";
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error en el servidor");
    }
};

module.exports = {
    arrRegister,
    validateRegister
};
