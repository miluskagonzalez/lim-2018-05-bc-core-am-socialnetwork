// Declarando variables del form
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signup = document.getElementById('signup');
const form = document.getElementById('form');
// Evento de registro
signup.addEventListener('click', () => {
  username = name.value;
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      //Verificando que se registró el usuario
      console.log('nuevo usuario registrado!');
    })
    .catch(error => {
      // Mostrando error en consola
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    // reset() limpia el form
    form.reset();
    console.log(username);
    alert(`¡Gracias por registrarte ${username}!`);
});
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
