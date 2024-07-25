import {auth,signInWithEmailAndPassword,getAuth} from  "../../utils/utils.js"
const login_form=document.getElementById("login_form");
const submit_btn=document.querySelector('#submit_btn');

login_form.addEventListener('submit',(e)=>{
e.preventDefault();
const email=e.target[0].value;
const password=e.target[1].value;
console.log("email",email);
console.log("password",password);

signInWithEmailAndPassword(auth,email,password).then(()=>{
    console.log("logged in successfully");
    window.location.href="/";
}).catch((err)=>{
    console.log(err);
    alert("Invalid Credentials");
})

}
    
)
