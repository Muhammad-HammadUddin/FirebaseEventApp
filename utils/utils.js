
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getFirestore,doc, getDocs,setDoc,getDoc,collection,addDoc,
    updateDoc,arrayUnion,arrayRemove,query,where,deleteDoc
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { getStorage,ref,uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
  import { getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDTknRe8e_60nPiFiml45Ji0KUPIRr7tmA",
    authDomain: "finalproject-7267b.firebaseapp.com",
    projectId: "finalproject-7267b",
    storageBucket: "finalproject-7267b.appspot.com",
    messagingSenderId: "678773851442",
    appId: "1:678773851442:web:da5071d7b9f8341a00832b",
    measurementId: "G-671WGB2HGP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);
  

  export {auth,db,storage,onAuthStateChanged,createUserWithEmailAndPassword, doc, setDoc,ref,uploadBytes, getDownloadURL,getStorage,signOut,getAuth,signInWithEmailAndPassword,getDoc,collection,addDoc,getDocs,  updateDoc,arrayUnion,arrayRemove,query,where,deleteDoc};
  