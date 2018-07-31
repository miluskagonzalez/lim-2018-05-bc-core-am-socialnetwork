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
// Validando inputs y registrando usuario
const validate = () => {
  if (/^[a-zA-Z0-9._-]+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(email.value) && //El método test() prueba una coincidencia en una cadena y devuelve verdadero si encuentra una coincidencia.
    /^[a-zA-Z0-9.ñ]{6,}$/.test(password.value) &&
    /^[a-z ñ]{3,}$/i.test(username.value)) {
    const name = username.value;
    emailSignUp();
  };
};  
// Evento de validación y registro
signUp.addEventListener('click', validate);
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', () => emailSignIn(userEmail.value, userPassword.value));
// Evento sign-in con Facebook
fbBtn.addEventListener('click', fbSignIn)
// Evento sign-in con Google
btnGoogle.addEventListener('click', googleSignIn);