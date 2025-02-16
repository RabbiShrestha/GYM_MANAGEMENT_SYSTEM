	  // Import the functions you need from the SDKs you need
	  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
	  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
	  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
	  // TODO: Add SDKs for Firebase products that you want to use
	  // https://firebase.google.com/docs/web/setup#available-libraries






// Initialize Firebase app



const firebaseConfig = {
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
  
  // Function to store user data in Firestore
  function storeUserData(userData) {
    const db = firebase.firestore();
    const MembersCollection = db.collection('Members');
  
    MembersCollection.add(userData)
      .then((docRef) => {
        console.log('User data stored with ID: ', docRef.id);
        // Additional operations after storing data if needed
      })
      .catch((error) => {
        console.error('Error storing user data:', error);
      });
  }
  
  // Function to handle form submission
  function registerMember(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const name = document.querySelector('#addMemberForm input[placeholder="Name"]').value;
    const address = document.querySelector('#addMemberForm input[placeholder="Address"]').value;
    const phoneNumber = document.querySelector('#addMemberForm input[placeholder="PhoneNumber"]').value;
    const email = document.querySelector('#addMemberForm input[placeholder="Email"]').value;
    const selectedPackage = document.querySelector('#Package').value;
    const joinDate = document.querySelector('#addMemberForm input[type="date"]').value;
  
    const userData = {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      package: selectedPackage,
      joinDate: joinDate
    };
  
    // Store the user data in Firestore
    storeUserData(userData);
  
    // You can update the UI or perform other actions after form submission
  }
  
  // Event listener for form submission
  document.getElementById("addMemberForm").addEventListener("submit", registerMember);