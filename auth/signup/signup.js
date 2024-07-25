import {
    createUserWithEmailAndPassword,
    doc,
    setDoc, auth,
    ref, uploadBytes, getDownloadURL,
    getStorage, db,
  } from '../../utils/utils.js';
  
  const storage = getStorage(); // Initialize storage instance
  const signup_user_btn = document.querySelector('#signup_user_btn');
  const signup_form = document.querySelector('#signup_form');
  
  signup_form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;
  
    var userinfo = {
      email, password, firstName, lastName, phone, company
    };
  
    signup_user_btn.disabled = true;
  
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(storage, `user/${user.uid}`);
      console.log(user.uid);
  
      uploadBytes(userRef, img).then(() => {
        return getDownloadURL(userRef);
      }).then((url) => {
        userinfo.img = url;
        const userDbRef = doc(db, `users/${user.uid}`);
        return setDoc(userDbRef, userinfo);
      }).then(() => {
        console.log("User data added to Firestore:", userinfo);
        window.location.href = ".././login/index.html";
        signup_user_btn.disabled = false;
      }).catch((error) => {
        console.error("Error adding to Firestore:", error);
        signup_user_btn.disabled = false;
      });
    }).catch((err) => {
      console.error("Error creating user:", err);
      alert(err.message);
      signup_user_btn.disabled = false;
    });
  });
  