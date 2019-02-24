const functions = require('firebase-functions');
const admin = require('firebase-admin');
var express = require('express');
var logger = require('morgan');
var engines = require('consolidate');
const bodyParser = require('body-parser');




var serviceAccount = require('./js/ServiceAccountKey.json');

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://diabetips-d7a7f.firebaseio.com"
});


function getUsers(){
    const ref = firebaseApp.database().ref('Users');
    return ref.once('value').then(snap => snap.val());
}



var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    getUsers().then(users => {
        response.render('index.hbs', {users});
    });
    
});

app.post('/patient', async (request, response) => {
     var id = request.body.id;
     var profileimage = request.body.profileimage;
     var fullname = request.body.fullname;
     var age = request.body.age;
     var bloodtype = request.body.bloodtype;
     var diabetes = request.body.diabetes;
     var insulin = request.body.insulin;
    //  function getUserInfo(){
    //      const ref = firebaseApp.database().ref('Blood Pressure Posts/Registered User/'+id);
    //      return ref.once('value').then(snap => snap.val());
         
    //  };

    //  getUserInfo().then(patient => {
    //      response.render('patient', {patient, id, profileimage, fullname, age, bloodtype, diabetes, insulin});
    //  });

     const ref = firebaseApp.database().ref('Blood Pressure Posts/Registered User/'+id);
     const bp = await ref.once('value').then(snap => snap.val());

     const ref2 = firebaseApp.database().ref('Glucose Level Posts/Registered User/'+id);
     const glucose = await ref2.once('value').then(snap => snap.val());

     response.render('patient', {bp, id, profileimage, fullname, age, bloodtype, diabetes, insulin, glucose});


     
    
});







app.use(express.static('./img')); 
app.use(express.static('./css')); 
app.use(express.static('./js')); 

exports.app = functions.https.onRequest(app);