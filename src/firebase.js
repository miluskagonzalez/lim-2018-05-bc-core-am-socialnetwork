// Inicializando Firebase
const config = {
  apiKey: 'AIzaSyDebuWMYcGSWAk5x7YGxciGKStz56KOHlY',
  authDomain: 'social-network-salud.firebaseapp.com',
  databaseURL: 'https://social-network-salud.firebaseio.com',
  projectId: 'social-network-salud',
  storageBucket: 'social-network-salud.appspot.com',
  messagingSenderId: '628278045322',
};
firebase.initializeApp(config);

// Creando usuario con email y contraseña
window.emailSignUp = (name, email, password, form) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      console.log(password);

      // Consoleando que se registró el usuario
      console.log('nuevo usuario registrado!');
      window.location.href = 'home.html';
    })
    .catch((error) => {
      // Mostrando error en consola
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      console.log(password.value);
    });
  // reset() limpia el form
  form.reset();
  console.log(name);
  alert(`¡Gracias por registrarte ${name}!`);
};

// Sign-in con email y password
window.emailSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      window.location.href = 'home.html';
    })
    .catch((error) => {
      console.log('Usuario no existente, Registrarse');
      console.log(error);
    });
};

// Sign-in con Facebook
window.fbSignIn = () => {
  // Creando instancia del objeto proveedor de Facebook
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      console.log('result', result);
      const token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      const { user } = result;
      console.log('user', user);
      alert('Habemus Facebook signin');
      window.location.href = 'home.html';
    }).catch((error) => {
      // Handle Errors here.
      const {
        code, message, email, credential,
      } = error;
      console.log(code, message, email, credential);
    });
};

// Sign-in con Google
window.googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Sesion con google', result);
      window.location.href = 'home.html';
    }).catch((error) => {
      const {
        code, message, mail, credential,
      } = error;
      console.log(code, message, mail, credential);
    });
};

// Sign-out del usuario
window.signOut = () => {
  firebase.auth().signOut()
    .then((user) => {
      console.log('Signed Out', user);
      window.location.href = 'index.html';
    }).catch((error) => {
      console.error('Sign Out Error', error);
    });
};

// Estado del usuario actual
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Usuario está logueado
    console.log(user);
  } else {
    // Usuario no está logueado
    console.log(user, 'is signed out');
  }
});
