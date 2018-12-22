//configuration code
var config = {
    apiKey: "AIzaSyAuzf302-T3l4duS6RPhAVKLAJk-b8_MvU",
    authDomain: "project1-b11a3.firebaseapp.com",
    databaseURL: "https://project1-b11a3.firebaseio.com",
    projectId: "project1-b11a3",
    storageBucket: "project1-b11a3.appspot.com",
    messagingSenderId: "689225661907"
};
firebase.initializeApp(config);

//initialise the authentication service
const auth = firebase.auth();


//sign up
document.getElementById("btnSignUp").addEventListener('click', e => {
    event.preventDefault();
    const email = document.getElementById("txtEmail").value;
    const pass = document.getElementById("txtPassword").value;
    auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
        console.log(error.message);
        // instead of console logging, display error on page to user 
        
    });
})

//login
document.getElementById("btnLogin").addEventListener('click', e => {
    const email = document.getElementById("txtEmail").value;
    const pass = document.getElementById("txtPassword").value;
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => { console.log(e.massage) })
})

//Act on state change (show/hide the logout button)
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("btnLogOut").classList.remove('hide')
    } else {
        document.getElementById("btnLogOut").classList.add('hide')
    }
})

//Logging out
document.getElementById("btnLogOut").addEventListener('click', e => {
    auth.signOut();
    console.log('logged out')
})

$("#btnLogOut").on("click", function(event) {
    $("#txtPassword").val("");
    $("#txtEmail").val("");

})

