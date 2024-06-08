import { registrarUsuarios } from "./promesas.js";
window.addEventListener("load", () =>{
    document.getElementById("btnEnviar").addEventListener("click", registrar);
});

const registrar = () =>{
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEmail = document.getElementById("email");
    let eFechaN = document.getElementById("fechaNacimiento");
    let eSexo = document.querySelector('input[name=sexo]:checked');
    let eTelefono = document.getElementById("telefono");
    let eAsunto = document.getElementById("opciones");
    let eMensaje = document.getElementById("mensaje");
    let eArchivo = document.getElementById("archivo");
    //----------------------------------------------//
    let nNombre = eNombre.value;
    let nApellido = eApellido.value;
    let nEmail = eEmail.value;
    let nFechaN = eFechaN.value;
    let nSexo = eSexo.value;
    let nTelefono = eTelefono.value;
    let nAsunto = eAsunto.value;
    let nMensaje = eMensaje.value;
    let nArchivo = eArchivo;
    //----------------------------------------------//
    let objeto = {nombre:nNombre, apellido:nApellido, email:nEmail, fecha:nFechaN, sexo:nSexo,telefono:nTelefono, asunto:nAsunto, mensaje:nMensaje, archivo:nArchivo};
    console.log(objeto)
    registrarUsuarios(objeto).then(()=>{
        alert("Registrado con Exito");
    }).catch((a)=>{
        alert("ERROR");
        alert(a);
    })
}

//Son las funciones capaces de cambiar el contraste y fuente de la pagina//
//Contraste//
const cambiarColor = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cambiarColor").addEventListener("click", cambiarColor);
})
//Fuente//
const cambiarLetras = () => {
    var element = document.body;
    element.classList.toggle("cambiar-fuente");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cambiarLetras").addEventListener("click", cambiarLetras);
})