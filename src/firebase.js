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
// Creando usuario con email y contraseña
window.emailSignUp = (name, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(password);
      //Verificando que se registró el usuario
      console.log('nuevo usuario registrado!');
      location.href = 'home.html'; //Establece el valor de href para que apunte a otro sitio web
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
// Sign-in con email y password
window.emailSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      location.href = 'home.html';
    })
    .catch(e => console.log('Usuario no existente, Registrarse'))
}
// Sign-in con Facebook
window.fbSignIn = () => {
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
      alert('Habemus Facebook signin');
      location.href = 'home.html';
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(error);
    });
};
// Sign-in con Google
window.googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('Sesion con google');
      console.log(result);
      location.href = 'home.html';
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
// Sign-out del usuario
window.signOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('Signed Out');
    location.href = 'index.html';
  }, (error) => {
    console.error('Sign Out Error', error);
  });
};
// Estado del usuario actual
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Usuario está logueado
    const displayName = user.displayName;
    const userPhoto = user.pothoURL;
    const userEmail = user.email;
    console.log(user);
  } else {
    // Usuario no está logueado
    console.log(user, 'is signed out');
  }
});