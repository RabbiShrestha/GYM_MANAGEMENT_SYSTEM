// Initialize Firebase with your configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0UeXLHeIM2rYxJd9vmBpLuYXj_zaC8TQ",
    authDomain: "gym-database-4e523.firebaseapp.com",
    databaseURL: "https://gym-database-4e523-default-rtdb.firebaseio.com",
    projectId: "gym-database-4e523",
    storageBucket: "gym-database-4e523.appspot.com",
    messagingSenderId: "729315069852",
    appId: "1:729315069852:web:1359d84a66b67ddde80259",
    measurementId: "G-N4ZFQXCXB4"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Function to toggle the display of the popup form
  function togglePopup() {
    var popup = document.getElementById('addTrainerPopup');
    if (popup) {
      if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
      } else {
        popup.style.display = 'none';
      }
    } else {
      console.error("Element with ID 'addTrainerPopup' not found.");
    }
  }
  
  // Function to handle cancel button (close popup)
  function cancelPopup() {
    var popup = document.getElementById('addTrainerPopup');
    if (popup) {
      popup.style.display = 'none';
    } else {
      console.error("Element with ID 'addTrainerPopup' not found.");
    }
  }
  
// Function to handle trainer registration
function registerTrainer(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form data for trainers
    const name = document.querySelector('#addTrainerForm input[placeholder="Name"]').value;
    const address = document.querySelector('#addTrainerForm input[placeholder="Address"]').value;
    const phoneNumber = document.querySelector('#addTrainerForm input[placeholder="PhoneNumber"]').value;
    const email = document.querySelector('#addTrainerForm input[placeholder="Email"]').value;
    const joinDate = document.querySelector('#addTrainerForm input[type="date"]').value;
    const password = document.querySelector('#addTrainerForm input[type="password"]').value;
  
    // Register the trainer with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Trainer registered:', user);
  
        // Call function to add trainer details to Firestore
        addTrainerToFirestore(name, address, phoneNumber, email, joinDate);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use. Please use a different email.');
        } else {
          console.error('Registration error:', errorCode, errorMessage);
          // Handle other registration errors or display messages as needed
        }
      });
  
    function addTrainerToFirestore(name, address, phoneNumber, email, joinDate) {
      // Check if trainer registration was successful
      if (firebase.auth().currentUser) {
        // If registration succeeded, proceed to add data to Firestore
        const db = firebase.firestore();
        const TrainersCollection = db.collection('Trainer');
  
        // Create a data object for the trainer
        const TrainerData = {
          name: name,
          address: address,
          phoneNumber: phoneNumber,
          email: email,
          joinDate: joinDate,
          actions: 'Actions Placeholder' // Replace with actual action data or remove this line if not needed
        };
  
        // Add trainer data to Firestore collection
        TrainersCollection.add(TrainerData)
          .then((docRef) => {
            console.log('Document written with ID:', docRef.id);
            alert('Trainer data saved successfully!');
          })
          .catch((error) => {
            console.error('Error adding document:', error);
          });
      }
    }
  }
  
  
  // Function to fetch and display trainer data in the table
  document.addEventListener('DOMContentLoaded', function () {
    var TrainerTableBody = document.getElementById('TrainerTableBody');
  
    if (!TrainerTableBody) {
      console.error("Element with ID 'TrainerTableBody' not found.");
      return;
    }
  
    var db = firebase.firestore();
    var TrainersCollection = db.collection('Trainer');
    TrainerTableBody.innerHTML = '';
  
    TrainersCollection.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var data = doc.data();
          var name = data.name;
          var address = data.address;
          var phoneNumber = data.phoneNumber;
          var email = data.email;
          var joinDate = data.joinDate;
          var actions = `
          <button onclick="removeTrainer('${doc.id}')">Remove</button>
         
        `;
  
          var newRow = `
            <tr>
              <td>${name}</td>
              <td>${address}</td>
              <td>${phoneNumber}</td>
              <td>${email}</td>
              <td>${joinDate}</td>
              <td>${actions}</td>
            </tr>
          `;
  
          TrainerTableBody.innerHTML += newRow;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  });
// Function to remove a trainer
function removeTrainer(trainerId) {
  if (confirm("Are you sure you want to remove this Trainer?")) {
    const db = firebase.firestore();
    const trainersCollection = db.collection('Trainer');

    // Remove the trainer from Firestore
    trainersCollection.doc(trainerId).delete()
      .then(function () {
        console.log("Trainer successfully removed!");
        location.reload(); // Refresh the page after removal
      })
      .catch(function (error) {
        console.error("Error removing Trainer: ", error);
      });
  }
}