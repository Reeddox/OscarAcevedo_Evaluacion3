import{ collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase.js';

export const registrarUsuarios = async(Usuarios)=>{
    console.log("Usuarios");
    console.log(Usuarios);
    const docRef = await addDoc(collection(db, "Usuarios"), Usuarios);
}

export const obtenerUsuarios = async() => {
    const ref = collection(db, "Usuarios");
    const querySnapshot = await getDocs(ref);
    console.log(querySnapshot);
    let listado = [];
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    });
    console.log(listado);
    return listado;
}

export const actualizarUsuarios = async(Usuarios,id) => {
    const ref = doc(db, "Usuarios", id);
    await updateDoc(ref, Usuarios);
}

export const eliminarUsuarios = async(id) => {
    const ref = doc(db, "Usuarios", id);
    await deleteDoc(ref)
}