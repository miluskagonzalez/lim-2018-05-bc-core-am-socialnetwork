/* global validate
   global emailSignIn
   global fbSignIn
   global googleSignIn */
// Declarando variables del form de registro
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signUp = document.getElementById('sign-up');
const signUpForm = document.getElementById('sign-up-form');

// Declarando variables del form de sign-in
const userEmail = document.getElementById('user-email');
const userPassword = document.getElementById('user-password');
const btnSignIn = document.getElementById('sign-in');

// Botones de registro con proveedor
const fbBtn = document.getElementById('fbBtn');
const btnGoogle = document.getElementById('btnGoogle');

// Evento de validación y registro
signUp.addEventListener('click', validate(username.value, password.value, email.value, signUpForm));
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', () => emailSignIn(userEmail.value, userPassword.value));
// Evento sign-in con Facebook
fbBtn.addEventListener('click', fbSignIn);
// Evento sign-in con Google
btnGoogle.addEventListener('click', googleSignIn);
