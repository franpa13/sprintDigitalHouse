
const botonesMostrar = document.querySelectorAll(".mostrar-descripcion");

botonesMostrar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const descripcion = boton.parentElement.querySelector(".descripcion");
        if (descripcion.style.display === "none" || descripcion.style.display === "") {
            descripcion.style.display = "block";
        } else {
            descripcion.style.display = "none";
        }
    });
});
