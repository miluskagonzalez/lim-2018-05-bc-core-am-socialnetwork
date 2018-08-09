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
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
// Creando usuario con email y contraseña
window.emailSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
// Sign-in con email y password
window.emailSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
// Sign-in con Facebook
window.fbSignIn = () => {
  // Creando instancia del objeto proveedor de Facebook
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(fbProvider)
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
window.signOut = () => auth.signOut();

// Estado del usuario actual
auth.onAuthStateChanged((user) => {
  if (user) {
    // Usuario está logueado
    console.log(user, 'is logged in');
    db.doc(`users/${user.uid}`).set({
    username: user.displayName,
    email: user.email,
    })
  } else {
    // Usuario no está logueado
    console.log(user, 'is signed out');
  }
})

// observador de ingreso de datos
// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//   });
// });

// creando coleccion de post, guardando para editar
// const docRef = db.collection("post").doc('postData');
// // DOM
// const post = document.getElementById('icon_prefix2');
// const textPost = document.getElementById('text-post');
// const btnpost = document.getElementById('btn-post');
// // Evento oyente de post
// btnpost.addEventListener('click', () => {
//   const textToSave = post.value;
//   console.log('texto de post ' + textToSave);
//   docRef.set({
//     contenido: textToSave
//     // author: user,
//     // privacidad: Privacy,
//     // likes: like,
//   }).then(() => {
//     consolo.log('status saved');
//   }).catch((error) => {
//     console.log('got an error: ', error);
//   })
// event.preventDefault();
// });
