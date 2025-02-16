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
// Function to toggle the display of the popup form
// Function to toggle the display of the popup form
function togglePopup1() {
  var popup1 = document.getElementById('addMemberPopup');
  if (popup1) {
    if (popup1.style.display === 'none' || popup1.style.display === '') {
      popup1.style.display = 'block';
    } else {
      popup1.style.display = 'none';
    }
  } else {
    console.error("Element with ID 'addMemberPopup' not found.");
  }
}

// Function to handle cancel button (close popup)
function cancelPopup1() {
  var popup1 = document.getElementById('addMemberPopup');
  if (popup1) {
    popup1.style.display = 'none';
  } else {
    console.error("Element with ID 'addMemberPopup' not found.");
  }
}

// Function to handle member registration
function registerMember1(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const name = document.querySelector('#addMemberForm input[placeholder="Name"]').value;
  const address = document.querySelector('#addMemberForm input[placeholder="Address"]').value;
  const phoneNumber = document.querySelector('#addMemberForm input[placeholder="PhoneNumber"]').value;
  const email = document.querySelector('#addMemberForm input[placeholder="Email"]').value;
  const selectedSubscriptions = document.querySelector('#Subscriptions').value;
  const joinDate = document.querySelector('#addMemberForm input[type="date"]').value;
  const password = document.querySelector('#addMemberForm input[type="password"]').value;

  // Check if any required field is empty
  if (name && address && phoneNumber && email && selectedSubscriptions && joinDate && password) {
    // Register the user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);

        // Create a data object
        const userData = {
          name: name,
          address: address,
          PhoneNumber: phoneNumber,
          email: email,
          Subscriptions: selectedSubscriptions,
          JoinDate: joinDate,
          Actions: 'Actions Placeholder' // Replace with actual action data or remove this line if not needed
        };

        // Call function to add member details to Firestore
        addMemberToFirestore(userData);
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
  } else {
    // Handle case where required fields are not filled
    alert('Please fill in all required fields');
  }
}

// Function to add member details to Firestore
function addMemberToFirestore(userData) {
  // Get Firestore reference and add data to 'Members' collection
  const db = firebase.firestore();
  const membersCollection = db.collection('Members');

  membersCollection.add(userData)
    .then((docRef) => {
      console.log('Document written with ID:', docRef.id);
      alert('Data saved successfully!');
      // You can add UI updates or other actions after successful data storage
    })
    .catch((error) => {
      console.error('Error adding document:', error);
    });
}


// Function to check and update subscription expiry without deleting user data
function checkSubscriptionExpiry() {
  const currentDate = new Date();
  const db = firebase.firestore();
  const membersCollection = db.collection('Members');

  membersCollection.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const data = doc.data();
        const joinDate = new Date(data.JoinDate);
        const subscription = data.Subscriptions;
        let expiryDate;

        switch (subscription) {
          case 'Simple':
            expiryDate = new Date(joinDate.getTime() + 30 * 24 * 60 * 30 * 1000); // 10 seconds expiry for testing
            break;
          case 'Ultra':
            expiryDate = new Date(joinDate.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days expiry
            break;
          case 'Extreme':
            expiryDate = new Date(joinDate.getTime() + 120 * 24 * 60 * 60 * 1000); // 120 days expiry
            break;
          default:
            expiryDate = new Date(joinDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Default to 30 days
            break;
        }

        if (currentDate > expiryDate) {
          // Subscription has expired, update table cell to 'Expired'
          const docId = doc.id;
          const expiredCell = document.getElementById(`subscription_${docId}`);
          if (expiredCell) {
            expiredCell.textContent = 'Expired';
            expiredCell.style.color = 'red'; // Apply red color to the 'Expired' text
          }
        }
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

// Function to fetch and display member data in the table
document.addEventListener('DOMContentLoaded', function () {
  var memberTableBody = document.getElementById('memberTableBody');

  if (!memberTableBody) {
    console.error("Element with ID 'memberTableBody' not found.");
    return;
  }

  var db = firebase.firestore();
  var membersCollection = db.collection('Members');
  memberTableBody.innerHTML = '';

  membersCollection.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        var name = data.name;
        var address = data.address;
        var PhoneNumber = data.PhoneNumber;
        var email = data.email;
        var Subscriptions = data.Subscriptions;
        var JoinDate = data.JoinDate;
        var Actions = data.actions;

        var newRow = `
          <tr>
            <td>${name}</td>
            <td>${address}</td>
            <td>${PhoneNumber}</td>
            <td>${email}</td>
            <td id="subscription_${doc.id}">${Subscriptions}</td>
            <td>${JoinDate}</td>
            <td>${Actions}</td>
          </tr>
        `;

        memberTableBody.innerHTML += newRow;
      });

      // After table is populated, check for subscription expiry
      checkSubscriptionExpiry();
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});


