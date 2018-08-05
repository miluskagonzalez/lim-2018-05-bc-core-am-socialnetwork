/* global validateUsername
   global validateEmail
   global validatePassword
   global emailSignUp
   global emailSignIn
   global fbSignIn
   global googleSignIn */
// Declarando variables del form de registro
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const btnSignUp = document.getElementById('sign-up');
// Declarando variables del form de inicio de sesión
const userEmail = document.getElementById('user-email');
const userPassword = document.getElementById('user-password');
const userEmailError = document.getElementById('user-email-error');
const userPasswordError = document.getElementById('user-password-error');
const btnSignIn = document.getElementById('sign-in');
// Botones de registro con proveedor
const btnFb = document.getElementById('fbBtn');
const btnGoogle = document.getElementById('btnGoogle');
// Mostrando en la UI estado de validación de nombre de usuario
username.addEventListener('change', (event) => {
  if (!validateUsername(event.target.value)) {
    usernameError.innerText = 'Escribe un nombre que contenga entre 3 y 15 letras mayúsculas o minúsculas.';
    usernameError.classList.remove('hide');
    username.classList.add('invalid');
  } else {
    usernameError.classList.add('hide');
    username.classList.remove('invalid');
    username.classList.add('valid');
  }
});
// Mostrando en la UI estado de validación de correo eléctrónico
email.addEventListener('change', (event) => {
  if (!validateEmail(event.target.value)) {
    emailError.innerText = 'Introduce un correo electrónico válido.';
    emailError.classList.remove('hide');
    email.classList.add('invalid');
  } else {
    emailError.classList.add('hide');
    email.classList.remove('invalid');
    email.classList.add('valid');
  }
});
userEmail.addEventListener('change', (event) => {
  if (!validateEmail(event.target.value)) {
    userEmailError.innerText = 'Introduce un correo electrónico válido.';
    userEmailError.classList.remove('hide');
    userEmail.classList.add('invalid');
  } else {
    userEmailError.classList.add('hide');
    userEmail.classList.remove('invalid');
    userEmail.classList.add('valid');
  }
});
// Mostrando en la UI estado de validación de contraseña
password.addEventListener('change', (event) => {
  if (!validatePassword(event.target.value)) {
    passwordError.innerText = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
    passwordError.classList.remove('hide');
    password.classList.add('invalid');
  } else {
    passwordError.classList.add('hide');
    password.classList.remove('invalid');
    password.classList.add('valid');
  }
});
// Mostrando en la UI estado de validación de contraseña
userPassword.addEventListener('change', (event) => {
  if (!validatePassword(event.target.value)) {
    userPasswordError.innerText = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
    userPasswordError.classList.remove('hide');
    userPassword.classList.add('invalid');
  } else {
    userPasswordError.classList.add('hide');
    userPassword.classList.remove('invalid');
    userPassword.classList.add('valid');
  }
});
// Evento que registra usuario si inputs son válidos
btnSignUp.addEventListener('click', () => {
  if (validateUsername(username.value)
    && validateEmail(email.value)
    && validatePassword(password.value)) {
    emailSignUp(email.value, password.value)
      .then((user) => {
        console.log(user);
        window.location.href = 'home.html';
      }).catch((error) => {
        console.log(error);
      });
  }
});
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', () => {
  emailSignIn(userEmail.value, userPassword.value)
    .then((user) => {
      console.log(user);
      window.location.href = 'home.html';
    })
    .catch((error) => {
      console.log('Usuario no existente, Registrarse');
      console.log(error);
    });
});
// Evento sign-in con Facebook
btnFb.addEventListener('click', fbSignIn);
// Evento sign-in con Google
btnGoogle.addEventListener('click', googleSignIn);
