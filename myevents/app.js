import { auth, db, deleteDoc, collection, onAuthStateChanged, signOut, getDoc, doc, getDocs, updateDoc, arrayUnion, arrayRemove, query, where } from '../utils/utils.js';

const logout = document.querySelector('.logout');
const login_link = document.getElementById('login_link');
const user_img = document.getElementById('user-img');
const events_card_container = document.getElementById('events_card_container');

onAuthStateChanged(auth, (user) => {
  if (user) {
    login_link.style.display = 'none';
    user_img.style.display = 'inline-block';
    const uid = user.uid;
    getuserinfo(uid);
    getmyEvents(uid);
  } else {
    login_link.style.display = 'inline-block';
    user_img.style.display = 'none';
  }
});

function getuserinfo(uid) {
  const userRef = doc(db, `users/${uid}`);
  getDoc(userRef).then((data) => {
    console.log("data==>", data.id);
    console.log("data==>", data.data());
    user_img.src = data.data().img;
  }).catch((error) => {
    console.error("Error getting document:", error);
  });
}

async function getmyEvents(uid) {
  console.log("Fetching all events");
  try {
    const q = query(collection(db, 'events'), where("createdby", "==", uid));
    const querySnapshot = await getDocs(q);
    events_card_container.innerHTML = '';
   
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const event = doc.data();
      const { banner, title, location, createdemail, createdby, des, time, date } = event;

      const card = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">${title}</h2>
            <p class="text-gray-600 mb-2">${time}</p>
            <p class="text-gray-600 mb-2">${createdemail}</p>
            <p class="text-gray-600 mb-2">${location}</p>
            <div class="flex justify-between items-center">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid) ? "Liked.." : "Like"}
                ${event?.likes?.length ? event?.likes?.length : ''}
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onclick="deleteEvent('${doc.id}')">
               Delete Me
              </button>
            </div>
          </div>
        </div>`;
      
      window.deleteEvent = deleteEvent;
      events_card_container.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    alert("Error fetching events");
  }
}

async function deleteEvent(eventId) {
  console.log(eventId);
  const docRef = doc(db, 'events', eventId);
  await deleteDoc(docRef);
  getmyEvents(auth.currentUser.uid);
}
