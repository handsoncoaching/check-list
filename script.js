// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
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

