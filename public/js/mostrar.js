
const botonesMostrar = document.querySelectorAll(".mostrar-descripcion");

botonesMostrar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        const descripcion = document.getElementById("descripcion_" + index);

        if (descripcion.style.display === "none" || descripcion.style.display === "") {
            descripcion.style.display = "block";
     
            boton.textContent = "Ocultar Descripción";
        } else {
            descripcion.style.display = "none";
            boton.textContent = "Mostrar Descripción";
        }
    });
});

