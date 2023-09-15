const dataUser = require("../baseDatos/usuarios.json")
const { body, validationResult } = require(`express-validator`)
const fs = require("fs")
const path = require("path")


const pathData = path.join(__dirname, "../baseDatos/usuarios.json")

const arrRegister = [
    body("NombreUsuario").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
    body("Email").notEmpty().withMessage("Debes ingresar tu email").bail().isEmail().withMessage("Debes ingresar un formato de email válido"),
    body("password").notEmpty().withMessage(`Debes ingresar tu password`),
    body("rePassword").notEmpty().withMessage("Debes repetir la contraseña"),
    // body("image").notEmpty().withMessage("Debes repetir la contraseña")



]
const validateRegister = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (errors.isEmpty()) {
            if (req.body.password === req.body.rePassword) {
                const NewUser = {
                    id: Date.now(),
                    NombreUsuario : req.body.NombreUsuario,
                    Email:req.body.Email,
                    password : req.body.password,
                    rePassword : req.body.rePassword,
                    image: req.file.filename
                }
                console.log(NewUser);
                dataUser.push(NewUser)
                fs.writeFileSync(pathData, JSON.stringify(dataUser))
                next()
            }
        
        } else {
            throw errors
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
