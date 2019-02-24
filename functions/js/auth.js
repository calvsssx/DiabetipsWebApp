auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(idTokenResult =>{
           user.admin = idTokenResult.claims.admin;
           loginUI(user);
        })
    }
  })