import{ collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from '/.firebase.js';

export const registrarUsuarios = async(usuario)=>{
    const docRef = await addDoc(collection(db, "usuario"))
}