/* eslint-disable no-unused-vars */
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
const emailSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
// Sign-in con email y password
const emailSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
// Sign-in con Facebook
const fbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return auth.signInWithPopup(fbProvider);
};
// Sign-in con Google
const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};
// Sign-out del usuario
const signOut = () => auth.signOut();

// Guardar usuario
const saveUser = (user, username) => db.doc(`users/${user.uid}`).set({ username, email: user.email });

const getCurrentUserData = () => db.doc(`users/${auth.currentUser.uid}`).get().then(doc => doc.data());

// Guardar post
const savePost = ({ content, privacy }, { username }) => {
  db.collection('posts').add({
    content: content.value,
    private: privacy.checked,
    author: {
      username,
      uid: auth.currentUser.uid,
    },
    likes: 0,
  });
};

// Eliminar post
db.collection("cities").doc("DC").delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});

// Estado del usuario actual
auth.onAuthStateChanged((user) => {
  if (user) {
    // Usuario está logueado
    const { uid } = user;
    const names = [...document.getElementsByClassName('name')];
    names.forEach((name) => {
      name.innerText = user.displayName;
    });
  } else {
    // Usuario no está logueado
    console.log(user, 'is signed out');
  }
});

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
