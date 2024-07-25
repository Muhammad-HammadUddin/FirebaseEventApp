import { auth, db,collection, onAuthStateChanged, signOut, getDoc, doc,getDocs,updateDoc,arrayUnion,arrayRemove } from './utils/utils.js';

const logout = document.querySelector('.logout');
const login_link = document.getElementById('login_link');
const user_img = document.getElementById('user-img');
const events_card_container=document.getElementById('events_card_container')
const myevents_btn=document.querySelector('#myevents_btn')
const create_event=document.querySelector('#create_event');
getallEvents();
onAuthStateChanged(auth, (user) => {
  if (user) {
    login_link.style.display = 'none';
    user_img.style.display = 'inline-block';
   const uid=user.uid;
   logout.style.display="inline-block";
   myevents_btn.style.display="inline-block";
   create_event.style.display="inline-block";
   getuserinfo(uid)
   
   // Delay added to ensure Firestore write propagation
  } else {
    login_link.style.display = 'inline-block';
    user_img.style.display = 'none';
    
    logout.style.display="none"
    myevents_btn.style.display="none";
    create_event.style.display="none";
  }
});

logout.addEventListener('click', function(e) {
  signOut(auth).then(() => {
    console.log("User signed out.");
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
});

function getuserinfo(uid) {
  const userRef = doc(db, `users/${uid}`);
  getDoc(userRef).then((data) => {
    console.log("data==>",data.id);
    console.log("data==>",data.data());
    user_img.src=data.data().img;
  }).catch((error) => {
    console.error("Error getting document:", error);
  });
}


async function getallEvents(){
  console.log("hye");
  try {
    events_card_container.innerHTML='';
    const querySnapshot=await getDocs(collection(db,"events"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}=>${doc.data()}`);

      const event=doc.data();
      const {banner,title,location,createdemail,createdby,des,time,date}=event;

      const card=` <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h2 class="text-xl font-bold mb-2">${title}</h2>
                    <p class="text-gray-600 mb-2">${time}</p>
                    <p class="text-gray-600 mb-2">${createdemail}</p>
                    <p class="text-gray-600 mb-2">${location}</p>
                    <div class="flex justify-between items-center">
                        <button
                        id=${doc.id}
                         class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600" onclick="likeEvent(this)">
                         ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)?"Liked..":"Like"}
                         ${event?.likes?.length ? event?.likes?.length :''}
                         </button>
                    </div>
                </div>
            </div>`
            window.likeEvent=likeEvent;
            events_card_container.innerHTML+=card;

    });
  } catch (error) {
    alert("Error");
  }

}
async function likeEvent(e){
if(auth.currentUser){
  e.disabled=true;
  const docRef=doc(db,"events",e.id);
  if(e.innerText=="Liked.."){
    updateDoc(docRef,{
      likes:arrayRemove(auth.currentUser.uid)
     }).then(()=>{
      
      e.innerText="Like";

      e.disabled=false;
     })
     .catch((err)=>console.log("error"));

  }
  else{
    updateDoc(docRef,{
      likes:arrayUnion(auth.currentUser.uid)
     }).then(()=>{
     e.innerText="Liked..";
     
     e.disabled=false;
     })
     .catch((err)=>console.log("error"));
  }
 
}
else{
  window.location.href="/auth/login/index.html"

}
}