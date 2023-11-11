
window.addEventListener("load", function(){
    let formulario = document.getElementById("Formulario")

    let inputs = document.querySelectorAll("#Formulario input");

    let expresionesRegulares = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, quion y quion bajo
        password: /^.{4,12}$/, // 4 a 12 digitos.
        email: /^[a-zA-z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    const campos = {
        nombreUsuario: false,
        password: false,
        email: false,
    }

    let validarFormulario = (e) => {
        switch(e.target.name){
            case "NombreUsuario":
                if(expresionesRegulares.usuario.test(e.target.value)){
                    let idNombreUsuario = document.querySelector("#Nombre-Usuario")
                    idNombreUsuario.classList.add('Nombre-Usuario-Correcto')
                    idNombreUsuario.classList.remove('Nombre-Usuario-Incorrecto')
                    //si esta correcto que avise en la vista
                    
                    campos.nombreUsuario = true
                }else {
                    let idNombreUsuario = document.querySelector("#Nombre-Usuario")
                    idNombreUsuario.classList.remove('Nombre-Usuario-Correcto')
                    idNombreUsuario.classList.add('Nombre-Usuario-Incorrecto')
                    //si esta incorrecto que avise en la vista
                    campos.nombreUsuario = false
                }
                
            break
            case "Email":
                if(expresionesRegulares.email.test(e.target.value)){
                    let idEmail = document.querySelector("#Email")
                    idEmail.classList.add('Email-Correcto')
                    idEmail.classList.remove('Email-Incorrecto')
                    //si esta correcto que avise en la vista
                    campos.email = true
                }else {
                    let idEmail = document.querySelector("#Email")
                    idEmail.classList.remove('Email-Correcto')
                    idEmail.classList.add('Email-Incorrecto')
                    //si esta incorrecto que avise en la vista
                    campos.email = false
                }
                
            break
            case "password":
                if(expresionesRegulares.password.test(e.target.value)){
                    let idPassword = this.document.querySelector("#password")
                    idPassword.classList.add("Password-Correcto")
                    idPassword.classList.remove("Password-Incorrecto")
                    //si esta correcto que avise en la vista
                    campos.password = true
                }else {
                    let idPassword = this.document.querySelector("#password")
                    idPassword.classList.remove("Password-Correcto")
                    idPassword.classList.add("Password-Incorrecto")
                    //si esta incorrecto que avise en la vista
                    campos.password = false
                }
                validacionRepassword()
            break
            case "rePassword":
                validacionRepassword()
            break
        }
    }

    const validacionRepassword = function(){
        let password = document.querySelector("#password")
        let rePassword = this.document.querySelector("#repassword")
        if(password.value !== rePassword.value){
            rePassword.classList.remove("Password-Correcto")
            rePassword.classList.add("Password-Incorrecto")
            campos.password = false
            //si esta incorrecto que avise en la vista

            
        }else{
            rePassword.classList.add("Password-Correcto")
            rePassword.classList.remove("Password-Incorrecto")
            campos.password = true
            //si esta correcto que avise en la vista  

        }
    }

    inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario)
        input.addEventListener("blur", validarFormulario)
        })
    

    formulario.addEventListener("submit", function(event) {
        if(campos.nombreUsuario && campos.nombreUsuario && campos.email == true){
            //si esta llenado el formulario se enviara
            console.log("enviado")
        }else{
   
            console.log("no enviado");
            //el formulario no esta llenado correctamente
        }
        
        
    })
})  