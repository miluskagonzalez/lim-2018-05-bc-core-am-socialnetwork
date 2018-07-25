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
// Declarando variables del form de registro
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signUp = document.getElementById('sign-up');
const signUpForm = document.getElementById('sign-up-form');
// Declarando variables del form de sign-in
const userEmail = document.getElementById('user-name');
const userPassword = document.getElementById('pass-word');
const btnSignIn = document.getElementById('sign-in');
const btnSignOut = document.getElementById('sign-out');
// Botones de registro con proveedor
const fbBtn = document.getElementById('fbBtn');
const btnGoogle = document.getElementById('btnGoogle');
// Creando usuario con email y contraseña
const emailSignUp = () => {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      console.log(password.value);
      //Verificando que se registró el usuario
      console.log('nuevo usuario registrado!');
    })
    .catch(error => {
      // Mostrando error en consola
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      console.log(password.value);
    });
  // reset() limpia el form
  signUpForm.reset();
  console.log(name);
  alert(`¡Gracias por registrarte ${name}!`);
}
// Validando inputs
const validate = () => {
  if (/^\w+([\.-]?\w+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(email.value) &&
    /^[a-zA-Z\d]{6,}$/.test(password.value) &&
    /^[a-z]{3,}$/i.test(username.value)) {
    const name = username.value;
    emailSignUp();
  }
}
// Sign-in con email y password
const emailSignIn = () => {
    // Consiguiendo valor de e-mail y contraseña
    const email = userEmail.value;
    const pass = userPassword.value;
    // const auth = firebase.auth();
    // Sign in
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
      // implementar
      promise.then(user => {
        console.log(user);
      })
      .catch(e => console.log('Usuario no existente, Registrarse'))
}
// Sign-in con Facebook
const fbSignIn = () => {
  // Creando instancia del objeto proveedor de Facebook
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      console.log('result', result);
      const token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
      // ...
      alert('Habemus Facebook signin')
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(error)
    });
}
// Sign-in con Google
googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('Sesion con google');
      console.log(result);
    }).catch(error => {
      console.log(error.code);
      console.log(error.message);
      // The email of the user's account used.
      console.log(error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential);
      // ...
    })
};

// Estado del usuario actual
firebase.auth().onAuthStateChanged(user => {
  // Usuario está logueado
  console.log(user);
  if (user) {
    btnSignOut.classList.remove('hide');
  } else {
    btnSignOut.classList.add('hide');
    // Usuario no está logueado
    console.log(user, 'is signed out');
  }
});
// Sign-out del usuario
signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
    }, (error) => {
      console.error('Sign Out Error', error);
    });
};
// Evento de validación y registro
signUp.addEventListener('click', validate);
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', emailSignIn);
// Evento sign-in con Facebook
fbBtn.addEventListener('click', fbSignIn)
// Evento sign-in con Google
btnGoogle.addEventListener('click', googleSignIn);
// Evento sign-out
btnSignOut.addEventListener('click', signOut);