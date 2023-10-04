const dataUser = require("../baseDatos/usuarios.json")
const { body, validationResult } = require(`express-validator`)
const fs = require("fs")
const path = require("path")
const { hashSync, compareSync, } = require("bcryptjs")
const { error } = require("console")
const session = require("express-session")

const pathData = path.join(__dirname, "../baseDatos/usuarios.json")

const arrRegister = [
    body("NombreUsuario").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
    body("Email").notEmpty().withMessage("Debes ingresar tu email").bail().isEmail().withMessage("Debes ingresar un formato de email válido"),
    body("password").notEmpty().withMessage(`Debes ingresar tu password`),
    body("rePassword").notEmpty().withMessage("Debes repetir la contraseña"),

]
const validateRegister = (req, res, next) => {
    const errors = validationResult(req);

    // console.log(`compasrar ${comparacion}`);
    try {
        if (!errors.isEmpty()) {
            throw errors
        }
    } catch (err) {
        res.render("registrarse", {
            errors: err.mapped(),
            old: req.body
        })
    }


    try {
        const hashing = hashSync(req.body.password, 10)
        const comparacion = compareSync(req.body.rePassword, hashing)
        if (comparacion) {

            const NewUser = {
                id: `${dataUser.length + 1} `,
                ...req.body,
                image: req.file.filename,
                password: hashSync(req.body.password, 10)
            }
            delete NewUser.rePassword

            dataUser.push(NewUser)
            fs.writeFileSync(pathData, JSON.stringify(dataUser))
            /** SESSION :  */

            // req.session.userLogged = NewUser

            next()
        } else {
            throw "confirmar la contraseña"
        }
    } catch (err) {
        res.render("registrarse", {
            errors: errors.mapped(),
            old: req.body
        })
    }

}
module.exports = {
    arrRegister,
    validateRegister
}
