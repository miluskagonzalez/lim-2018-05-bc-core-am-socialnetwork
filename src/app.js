// Inicializando Firebase
const config = {
  apiKey: "AIzaSyDebuWMYcGSWAk5x7YGxciGKStz56KOHlY",
  authDomain: "social-network-salud.firebaseapp.com",
  databaseURL: "https://social-network-salud.firebaseio.com",
  projectId: "social-network-salud",
  storageBucket: "social-network-salud.appspot.com",
  messagingSenderId: "628278045322"
};
firebase.initializeApp(config);
// Declarando variables del form
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signUp = document.getElementById('sign-up');
const signUpForm = document.getElementById('sign-up-form');
const fbBtn = document.getElementById('fbBtn');
// Crear usuario con email y contraseña
const emailSignUp = () => {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      console.log(password.value)
      //Verificando que se registró el usuario
      console.log('nuevo usuario registrado!');
    })
    .catch(error => {
      // Mostrando error en consola
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      console.log(password.value)
    });
  // reset() limpia el form
  signUpForm.reset();
  console.log(name);
  alert(`¡Gracias por registrarte ${name}!`);
}
// Validar inputs
const validate = () => {
  if (/^\w+([\.-]?\w+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(email.value) &&
    /^[a-zA-Z\d]{6,}$/.test(password.value) &&
    /^[a-z]{3,}$/i.test(username.value)) {
    const name = username.value;
    emailSignUp()
  }
}
// Evento de registro
signUp.addEventListener('click', validate);
// Verificando estado (logueado / no logueado) del usuario
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Usuario está logueado
    console.log(user)
  } else {
    // Usuario no está logueado
    console.log(user, 'is signed out')
  }
});
// Creando instancia del objeto proveedor de Facebook
const fbProvider = new firebase.auth.FacebookAuthProvider();
// Log-in con Facebook
const fbLogIn = () => {
  firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      alert('Habemus Facebook login')
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error)
    });
}
// Evento log-in con Facebook
fbBtn.addEventListener('click', fbLogIn)