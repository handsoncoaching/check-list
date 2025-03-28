// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJjESRA9WfLbHBMA7Gt5z1-QxXs4hBSy0",
  authDomain: "handsoncoaching-fdc45.firebaseapp.com",
  projectId: "handsoncoaching-fdc45",
  storageBucket: "handsoncoaching-fdc45.firebasestorage.app",
  messagingSenderId: "812245181548",
  appId: "1:812245181548:web:cf3c265a6f0b3954c4e449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById('dataForm');
const entriesList = document.getElementById('entriesList');
const clearButton = document.getElementById('clearData');

// Function to save data
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const eventName = document.getElementById('event').value;
    const details = document.getElementById('details').value;
    
    const newEntry = database.ref('entries').push();
    newEntry.set({ name, event: eventName, details });
    
    form.reset();
});

// Function to fetch and display saved data in real-time
database.ref('entries').on('value', function(snapshot) {
    entriesList.innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
        const data = childSnapshot.val();
        const listItem = document.createElement('li');
        listItem.textContent = `${data.name} - ${data.event}: ${data.details}`;
        entriesList.appendChild(listItem);
    });
});

// Function to clear all data
clearButton.addEventListener('click', function() {
    database.ref('entries').remove();
});

