import {ref,storage,uploadBytes,getDownloadURL,db,collection,addDoc,auth} from'../utils/utils.js';

const event_form=document.getElementById('event_form');
event_form.addEventListener('submit',(e)=>{
e.preventDefault();
console.log("hye");
const event_info={
    banner:e.target[0].files[0],
    title:e.target[1].value,
    description:e.target[2].value,
    location:e.target[3].value,
    date:e.target[4].value,
    time:e.target[5].value,
    createdby:auth.currentUser.uid,
    createdemail:auth.currentUser.email,
    likes:[]
    
};
const imgref=ref(storage,event_info.banner.name);
const img=uploadBytes(imgref,event_info.banner).then((result) => {
    console.log("File upload done");
    getDownloadURL(imgref).then((url) => {
     console.log(url);
     event_info.banner=url;

     const eventcollection=collection(db,"events");
     addDoc(eventcollection,event_info).then((result) => {
        console.log("Event added");
        window.location.href='/';
     })
    })
    
})

})