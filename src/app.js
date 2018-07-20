const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signup = document.getElementById('signup');
const form = document.getElementById('form');

signup.addEventListener('click', () => {
  username = name.value;
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      console.log('nuevo usuario registrado!');
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    form.reset();
    console.log(username);
    alert(`¡Gracias por registrarte ${username}!`);
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log(user)
  } else {
    // User is signed out.
    console.log(user, 'is signed out')
  }
});
