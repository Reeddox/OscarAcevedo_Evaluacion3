import { registrarUsuarios } from "./promesas";
window.addEventListener("load", () =>{
    document.getElementById("btnEnviar").addEventListener("click", registrar);
});

const registrar = () =>{
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEmail = document.getElementById("email");
    let eFechaN = document.getElementById("fechaNacimiento");
    let eSexo = document.querySelector(['input(name=sexo']);
    let eTelefono = document.getElementById("telefono");
    let eAsunto = document.getElementById("asunto");
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
    let objeto = {nombre:nNombre, apellido:nApellido, email:nEmail, fecha:nFechaN, sexo:eSexo,telefono:nTelefono, asunto:nAsunto, mensaje:nMensaje, archivo:nArchivo};
    registrarUsuarios(objeto).then(()=>{
        alert("Registrado con Exito");
    }).catch((a)=>{
        alert("ERROR");
        alert(a);
    })
}

function cambiarColor(){
    var element = document.body;
    element.classlist.toggle("dark-mode");
}