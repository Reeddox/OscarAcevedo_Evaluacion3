import { registrarUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } from "./promesas.js";
window.addEventListener("load", () =>{
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    document.getElementById("btnActualizacion").addEventListener("click", actualizar);
    cargar_datos();
});

const registrar = () =>{
    //Se recuperan los elementos del HTML//
    let eNombre = document.getElementById("nombre"); //Recibe el elemento con el id "nombre"
    let eApellido = document.getElementById("apellido"); //Recibe el elemento con el id "apellido"
    let eEmail = document.getElementById("email"); //Recibe el elemento con el id "email"
    let eFechaN = document.getElementById("fechaNacimiento"); //Recibe el elemento con el id "fechaNacimiento"
    let eSexo = document.querySelector('input[name=sexo]:checked'); //Recibe el primer elemento input del tipo radio con el nombre "sexo" que esta marcado (checked)
    let eTelefono = document.getElementById("telefono"); //Recibe el elemento con el id "telefono"
    let ePersonaje = []; //Se inicia un array vacio
    document.querySelectorAll('input[name=Personaje]:checked').forEach((checkbox) => {
        ePersonaje.push(checkbox.value); 
    });//Recibe los elementos input de tipo checkbox con el nombre "Personaje" que estan marcados (checked)
    let eAsunto = document.getElementById("opciones"); //Recibe el elemento con el id "opciones"
    let eMensaje = document.getElementById("mensaje"); //Recibe el elemento con el id "mensaje"
    //----------------------------------------------//

    //Se recuperan los valores de esos elementos//
    let nNombre = eNombre.value; //Recibe el valor del elemento eNombre
    let nApellido = eApellido.value; //Recibe el valor del elemento eApellido
    let nEmail = eEmail.value; //Recibe el valor del elemento eEmail
    let nFechaN = eFechaN.value; //Recibe el valor del elemento eFechaN
    let nSexo = eSexo.value; //Recibe el valor del elemento eSexo
    let nTelefono = eTelefono.value; //Recibe el valor del elemento eTelefono
    let nPersonaje = ePersonaje; //Asigna el array ePersonaje a la variable nPersonaje
    //En ePersonaje no va el .value porque los array no tienen esa propiedad
    let nAsunto = eAsunto.value; //Recibe el valor del elemento eAsunto
    let nMensaje = eMensaje.value; //Recibe el valor del elemento eMensaje
    //----------------------------------------------//

    //Se crea un objeto//
    let objeto = {nombre:nNombre, apellido:nApellido, email:nEmail, fecha:nFechaN, sexo:nSexo, telefono:nTelefono, personaje:nPersonaje, asunto:nAsunto, mensaje:nMensaje};
    console.log(objeto);
    registrarUsuarios(objeto).then(()=>{
        alert("Registrado con Exito");
    }).catch((a)=>{
        alert("ERROR");
        alert(a);
    })
}

const cargar_datos = () => {
    //Va a la base de datos, trae los datos almacenados y los muestra en la estructura//
    obtenerUsuarios().then((Usuarios) => {
        console.log("Datos recuperados");
        let estructura = "";
        Usuarios.forEach((Usuarios) => {
            estructura+="<tr>";
            estructura+="<td>"+Usuarios.nombre+"</td>"; //Agrega una celda con el valor de Usuarios.nombre
            estructura+="<td>"+Usuarios.apellido+"</td>"; //Agrega una celda con el valor de Usuarios.apellido
            estructura+="<td>"+Usuarios.email+"</td>"; //Agrega una celda con el valor de Usuarios.email
            estructura+="<td>"+Usuarios.fecha+"</td>"; //Agrega una celda con el valor de Usuarios.fecha
            estructura+="<td>"+Usuarios.sexo+"</td>"; //Agrega una celda con el valor de Usuarios.sexo
            estructura+="<td>"+Usuarios.telefono+"</td>"; //Agrega una celda con el valor de Usuarios.telefono
            estructura+="<td>"+Usuarios.personaje.join(', ')+"</td>"; //Agrega una celda con el valor de Usuarios.personaje//El join une el array en una cadena//
            estructura+="<td>"+Usuarios.asunto+"</td>"; //Agrega una celda con el valor de Usuarios.asunto
            estructura+="<td>"+Usuarios.mensaje+"</td>"; //Agrega una celda con el valor de Usuarios.mensaje
            estructura+="<td><button id= ACT"+Usuarios.id+"> Editar </button></td>"; 
            estructura+="<td><button id= DEL"+Usuarios.id+"> Eliminar </button></td>";
            estructura+="</tr>";
        });

    document.getElementById("tablaDatos").innerHTML = estructura; //Se renderiza la estructura en el HTML//
    Usuarios.forEach((Usuarios) => {
        let btnActualizar = document.getElementById("ACT"+Usuarios.id);
        //Al momento de clickear el boton Actualizar en la estructura, se cargan los datos en el formulario//
        btnActualizar.addEventListener("click", () => {
            let eNombre = document.getElementById("nombre");
            let eApellido = document.getElementById("apellido");
            let eEmail = document.getElementById("email");
            let eFechaN = document.getElementById("fechaNacimiento");
            console.log("Usuarios.sexo", Usuarios.sexo);
            let eSexo = document.querySelector('input[name=sexo][value="${Usuarios.sexo}"]');
            if (eSexo) eSexo.checked = true;
            console.log("eSexo", eSexo);
            let eTelefono = document.getElementById("telefono");
            let ePersonaje = document.querySelectorAll('input[name=Personaje]');
            let eAsunto = document.getElementById("opciones");
            let eMensaje = document.getElementById("mensaje");
        //-------------------------------------------------------------------------------------------------//
            //Los valores de los elementos en las celdas se cargan en los campos del formulario//
            eNombre.value = Usuarios.nombre;
            eApellido.value = Usuarios.apellido;
            eEmail.value = Usuarios.email;
            eFechaN.value = Usuarios.fecha;
            eTelefono.value = Usuarios.telefono;
            ePersonaje.forEach(checkbox => {
                checkbox.checked = Usuarios.personaje.includes(checkbox.value);
            }); //Esta linea recorre todos los checkbox y los marca si el valor esta en el array Usuarios.personaje //
            eAsunto.value = Usuarios.asunto;
            eMensaje.value = Usuarios.mensaje;
            //El boton Registrar se oculta y a su vez el boton Actualizar del formulario se revela//
            document.getElementById("btnRegistrar").style.display = "none";
            document.getElementById("btnActualizacion").style.display = "inline"
            document.getElementById("btnActualizacion").value = Usuarios.id;
        });
        
        let btnEliminar = document.getElementById("DEL"+Usuarios.id);
        //Al momento de clickear el boton Eliminar, aparece una ventana que pregunta si esta seguro de querer eliminar a ese usuario//
        btnEliminar.addEventListener("click", () => {
            if(confirm("¿Quieres eliminar a :\nNombre"+Usuarios.nombre+" "+Usuarios.apellido+"?")){
                eliminarUsuarios(Usuarios.id).then(() => {
                    alert("Eliminado");
                    cargar_datos();
                })
            }
        });
    });
});
}

const actualizar = () => {
    //Se recuperan los elementos del HTML//
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEmail = document.getElementById("email");
    let eFechaN = document.getElementById("fechaNacimiento");
    let eSexo = document.querySelector('input[name=sexo]:checked');
    let eTelefono = document.getElementById("telefono");
    let ePersonaje = [];
    document.querySelectorAll('input[name=Personaje]:checked').forEach((checkbox) => {
        ePersonaje.push(checkbox.value);
    });
    let eAsunto = document.getElementById("opciones");
    let eMensaje = document.getElementById("mensaje");
    //----------------------------------------------//
    //Se recuperan los valores de esos elementos//
    let nNombre = eNombre.value;
    let nApellido = eApellido.value;
    let nEmail = eEmail.value;
    let nFechaN = eFechaN.value;
    let nSexo = eSexo.value;
    let nTelefono = eTelefono.value;
    let nPersonaje = ePersonaje; //En ePersonaje no va el .value porque los array no tienen esa propiedad//
    let nAsunto = eAsunto.value;
    let nMensaje = eMensaje.value;
    //----------------------------------------------//
    //Se crea un objeto//
    let objeto = {nombre:nNombre, apellido:nApellido, email:nEmail, fecha:nFechaN, sexo:nSexo, telefono:nTelefono, personaje:nPersonaje, asunto:nAsunto, mensaje:nMensaje};
    console.log(objeto);
    let id = document.getElementById("btnActualizacion").value;
    actualizarUsuarios(objeto, id).then(() => {
        alert("Usuario Actualizado");
        cargar_datos();
    }).catch((a) => {
        alert("ERROR");
        alert(a);
    });
}


//Son las funciones capaces de cambiar el contraste y fuente de la pagina//
//Contraste//
const cambiarColor = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
//Use el evento DOMContentLoaded en vez de load porque necesitaba que este funcionara primero sin esperar a que se carguen imagenes o el css primero//
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cambiarColor").addEventListener("click", cambiarColor);
})
//Fuente//
const cambiarTamanioLetras = () => {
    var element = document.body;
    element.classList.toggle("cambiar-fuenteTamanio");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cambiarLetras").addEventListener("click", cambiarTamanioLetras);
})