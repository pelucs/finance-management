import { NavigateFunction } from "react-router-dom";

import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD8kbgWXCxsKmxiO7d3xHURuMJXxEJJ0qo",
  authDomain: "finance-management-aeb7f.firebaseapp.com",
  projectId: "finance-management-aeb7f",
  storageBucket: "finance-management-aeb7f.appspot.com",
  messagingSenderId: "743072498076",
  appId: "1:743072498076:web:f4f5bebcd74cb8a233c859"
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = getStorage();

export default {

  //CRIAR USUÁRIO
  register: async (name: string, email: string, password: string, confirmPassword: string, navigate: NavigateFunction) => {
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(AuthUser => {

      AuthUser.user?.updateProfile({
        displayName: name
      })
      .then(() => {
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          let key = Math.floor(Math.random() * 5000);

          localStorage.setItem("keyAcess", key.toString());
          navigate("/app");

        })
      })
      
      alert("Conta criada com sucesso!")
    })
    .catch((error) => alert(error.message));

  },

  //LOGAR
  login: async (email: string, password: string, navigate: NavigateFunction) => {
    
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      let key = Math.floor(Math.random() * 5000);

      localStorage.setItem("keyAcess", key.toString());
      navigate("/app");

    });
  },

  //DESLOGAR
  logout: async () => {
    
    auth.signOut()
    .then(() => {
      localStorage.removeItem("keyAcess");
      window.location.href = "/";
    })
    .catch(error => alert(error.message));

  },

  //ATUALIZAR DADOS
  updateData: async (name: string, img: any, uid: string) => {
    let user = auth.currentUser;

    if(img){
      let imageRef = ref(storage, uid);

      await uploadBytes(imageRef, img)
      .then(() => {
        getDownloadURL(imageRef).then(url => {
          if(user){
              user.updateProfile({
              photoURL: url
            })
          }
        })
      })
    }

    if(user){
      user.updateProfile({
        displayName: name,
      })
      .then(() => window.location.reload())
    }

  },

  //ENVIAR EMAIL DE VERIICAÇÃO
  sendEmailVerification: async () => {
    let user = auth.currentUser;
    
    if(user){
      user.sendEmailVerification()
      .then(() => alert(`Email enviado para ${user?.email}`))
      .catch(error => alert(error.message));
    }
  },
  
  //ENVIAR EMAIL PARA REDEFINIR SENHA
  sendEmailRedefinePassword: async () => {
    let email = auth.currentUser?.email;
    
    if(email){
      auth.sendPasswordResetEmail(email)
      .then(() => alert(`Email enviado para ${email}`))
      .catch(error => alert(error.message));
    }
  },

  //EXCLUIR CONTA
  deleteAccount: async (email: string, password: string) => {

    auth.signInWithEmailAndPassword(email, password)
    .then(AuthUser => {
      AuthUser.user?.delete()
      .then(() => {
        localStorage.removeItem("keyAcess");
        window.location.href = "/";
      })
      .catch(error => alert(error.message));
    })
    .catch(error => alert(error.message));
  },

  //ADICIONAR CONTA
  createCount: async (count: string, value: number, type: string) => {
    let uid = auth.currentUser?.uid;

    let data = new Date(),
        day  = data.getDate().toString(),
        dayF = (day.length == 1) ? '0' + day : day,
        month  = (data.getMonth() + 1).toString(),
        monthF = (month.length == 1) ? '0' + month : month,
        year = data.getFullYear();

    if(uid){
      db.collection("counts").add({
        count,
        value,
        type,
        uid,
        date: `${dayF}/${monthF}/${year}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        window.location.reload()
      })
      .catch(error => alert(error.message))
    }
  },

  //EDITAR CONTA
  editCount: async (count: string, value: number, type: string, id: string, date: string) => {

    db.collection("counts").doc(id).update({
      count,
      type,
      value,
      date,
    })
    .then(() => window.location.reload())
    .catch(error => alert(error.message));

  },

  //DELETAR CONTA
  deleteCount: async (id: string) => {
    db.collection("counts").doc(id).delete()
    .then(() => window.location.reload())
    .catch(error => alert(error.message))
  },

  //DELETAR MAIS DE UMA CONTA
  deleteAllCount: async (ids: string[]) => {
    for(let i = 0; ids.length > i; i++){
      await db.collection("counts").doc(ids[i]).delete();
    }

    window.location.reload();
  }
}