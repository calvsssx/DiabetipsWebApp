const loginUI = (user) => {
    if (! user.admin){
      
      $(".loggedin-div").hide();
      // $("#fail-sign-in").show();
      document.getElementById("user_div_fail").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("user_div").style.display = "none";
      alert("USER IS NOT AN ADMIN PLEASE LOG OUT!");
      
    }
  }
  
  
  $(document).ready(function () {
    $('#escalation').DataTable();
  });
  // $("#fail-sign-in").click(
  //   function(){
  //       firebase.auth().signOut().then(function() {
  //         $("#loginProgress").hide();
  //         $("#loginBtn").show();
  //         $("#sign-out").show();
  
  //         }).catch(function(error) {
  //           // An error happened.
  //           alert(error.message);
  //         });
  //   }
  // );
  
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("user_div_fail").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML =  email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      document.getElementById("user_div_fail").style.display = "none";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  

 

