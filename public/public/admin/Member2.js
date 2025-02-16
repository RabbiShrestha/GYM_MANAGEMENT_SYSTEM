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
  

// Function to search and update member subscription

function searchAndUpdateSubscription() {
    const memberType = document.getElementById('memberType').value;
    const memberEmail = document.getElementById('memberEmail').value;
  
    const db = firebase.firestore();
    const membersCollection = db.collection('Members');
  
    // Find the member by email
    membersCollection.where('email', '==', memberEmail).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Member found, update their subscription
          const memberId = doc.id;
          membersCollection.doc(memberId).update({ Subscriptions: memberType })
            .then(() => {
              // Subscription updated successfully
              alert(`Subscription for ${memberEmail} updated to ${memberType} successfully!`);
              cancelRenewPopup(); // Close the renewal popup
            })
            .catch((error) => {
              console.error('Error updating subscription:', error);
              alert('Error updating subscription. Please try again.'); // Show error message
            });
        });
  
        // Handle case where member with the provided email was not found
        if (querySnapshot.size === 0) {
          alert('Member not found with the provided email.'); // Show error message
        }
      })
      .catch((error) => {
        console.error('Error searching for member:', error);
        alert('Error searching for member. Please try again.'); // Show error message
      });
  }