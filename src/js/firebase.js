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
const database = firebase.firestore();
database.settings({ timestampsInSnapshots: true });
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
const saveUser = (user, username) => database.doc(`users/${user.uid}`).set({ username, email: user.email });

const getCurrentUserData = () => database.doc(`users/${auth.currentUser.uid}`).get();
// Guardar post
const savePost = ({ content, privacy }, userData) => database.collection('posts').add({
  content: content.value,
  private: privacy.checked,
  author: {
    username: userData.data().username,
    uid: userData.id,
  },
  likes: 0,
});

const getPosts = (postsContainer, currentID, renderPosts) => {
  database.collection('posts').onSnapshot((snapshot) => {
    const container = postsContainer;
    container.innerHTML = '';
    snapshot.forEach((doc) => {
      const post = doc.data();
      if (post.author.uid !== currentID && post.private === false) {
        renderPosts(post, doc.id, false);
      } else if (post.author.uid === currentID) {
        renderPosts(post, doc.id, true);
      }
    });
  });
};

// Borrar post
const deletPost = id => database.doc(`posts/${id}`).delete();

// Estado del usuario actual
const onAuthState = (postsContainer, renderPosts) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      getCurrentUserData()
        .then(({ id }) => {
          getPosts(postsContainer, id, renderPosts);
        });
      // Usuario está logueado
      // const { uid, photoURL } = user;
      // const names = [...document.getElementsByClassName('name')];
      // names.forEach((name) => {
      //   name.innerText = user.displayName;
      // });
      // document.getElementById('user-photo').src = photoURL;
      // const emails = [...document.getElementsByClassName('email')];
      // emails.forEach(uemail => {
      //   const email = uemail;
      //   email.innerText = user.email;
      // });
    } else {
      // Usuario no está logueado
      console.log(user, 'is signed out');
    }
  });
};
