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
const saveUser = (user, username) => database.doc(`users/${user.uid}`).set({
  username,
  email: user.email,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
});

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
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
});

const getPosts = (postsContainer, currentID, renderPosts) => {
  database.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
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

const updatePost = (postID, { content, privacy }) => database.doc(`posts/${postID}`).update({
  content: content.value,
  private: privacy.checked,
});

// Dar like a un post
const updateLikeCount = (postID, likeCount) => database.doc(`posts/${postID}`).update({ likes: likeCount });

// Estado del usuario actual
const onAuthState = (postsContainer, renderPosts, renderUserInfo) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { photoURL } = user;
      getCurrentUserData()
        .then((userData) => {
          getPosts(postsContainer, userData.id, renderPosts);
          renderUserInfo(photoURL, userData);
        });
    } else {
      window.location.replace('index.html');
    }
  });
};
