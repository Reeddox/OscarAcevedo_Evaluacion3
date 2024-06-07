import{ collection, addDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase.js';

export const registrarUsuarios = async(Usuarios)=>{
    console.log("Usuarios");
    console.log(Usuarios);
    const docRef = await addDoc(collection(db, "Usuarios"), Usuarios);
}