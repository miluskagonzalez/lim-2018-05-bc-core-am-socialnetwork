/* eslint-disable no-unused-vars */
// Declarando variables del form de registro
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnSignUp = document.getElementById('sign-up');
// Declarando variables del form de inicio de sesión
const userEmail = document.getElementById('user-email');
const userPassword = document.getElementById('user-password');
const btnSignIn = document.getElementById('sign-in');
// Botones de registro con proveedor
const btnFb = document.getElementById('fbBtn');
const btnGoogle = document.getElementById('btnGoogle');
const usernameWithProvider = document.getElementById('username-with-provider');
const signInWithProvider = document.getElementById('signin-with-provider');

const closeModal = modalID => document.getElementById(modalID).classList.remove('modal-block');

// Mostrando en la UI estado de validación de inputs
const validationHandler = (input, containerID, message) => {
  const container = document.getElementById(containerID);
  if (!validate(input)) {
    container.innerText = message;
    container.classList.remove('hide');
    input.classList.add('invalid');
  } else {
    container.classList.add('hide');
    input.classList.remove('invalid');
    input.classList.add('valid');
  }
};
username.addEventListener('change', (event) => {
  const errorMessage = 'Escribe un nombre que contenga entre 3 y 15 letras mayúsculas o minúsculas.';
  validationHandler(event.target, 'username-error', errorMessage);
});
usernameWithProvider.addEventListener('change', (event) => {
  const errorMessage = 'Escribe un nombre que contenga entre 3 y 15 letras mayúsculas o minúsculas.';
  validationHandler(event.target, 'username-with-provider-error', errorMessage);
});
email.addEventListener('change', (event) => {
  const errorMessage = 'Introduce un correo electrónico válido.';
  validationHandler(event.target, 'email-error', errorMessage);
});
userEmail.addEventListener('change', (event) => {
  const errorMessage = 'Introduce un correo electrónico válido.';
  validationHandler(event.target, 'user-email-error', errorMessage);
});
password.addEventListener('change', (event) => {
  const errorMessage = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
  validationHandler(event.target, 'password-error', errorMessage);
});
userPassword.addEventListener('change', (event) => {
  const errorMessage = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
  validationHandler(event.target, 'user-password-error', errorMessage);
});

// Regitra usuario si inputs son válidos
btnSignUp.addEventListener('click', () => {
  if (validate(username) && validate(email) && validate(password)) {
    emailSignUp(email.value, password.value)
      .then(({ user }) => saveUser(user, username.value))
      .then(() => window.location.replace('home.html'))
      .catch((error) => {
        console.log(error);
      });
  }
});
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', () => {
  if (validate(userEmail) && validate(userPassword)) {
    emailSignIn(userEmail.value, userPassword.value)
      .then(() => window.location.replace('home.html'))
      .catch(({ code }) => {
        if (code === 'auth/user-not-found') {
          document.getElementById('user-not-found').classList.add('modal-block');
        } else if (code === 'auth/wrong-password') {
          const container = document.getElementById('user-password-error');
          container.innerText = 'Tu contraseña es incorrecta.';
          container.classList.remove('hide');
          userPassword.classList.add('invalid');
        }
      });
  }
});
// Obtener nombre de usuario registrado con proveedor
const getUsername = (user) => {
  document.getElementById('username-modal').classList.add('modal-block');
  signInWithProvider.addEventListener('click', () => {
    if (validate(usernameWithProvider)) {
      saveUser(user, usernameWithProvider.value)
        .then(() => window.location.replace('home.html'));
    }
  });
};
// Verificar si es usuario nuevo
const verifyUserStatus = ({ isNewUser }, user) => {
  if (isNewUser) {
    getUsername(user);
  } else {
    window.location.replace('home.html');
  }
};
// Evento sign-in con Facebook
btnFb.addEventListener('click', () => {
  fbSignIn()
    .then(({ additionalUserInfo, user }) => verifyUserStatus(additionalUserInfo, user))
    .catch((error) => {
      const {
        code, message,
      } = error;
      console.log(code, message);
    });
});
// Evento sign-in con Google
btnGoogle.addEventListener('click', () => {
  googleSignIn()
    .then(({ additionalUserInfo, user }) => verifyUserStatus(additionalUserInfo, user))
    .catch((error) => {
      const {
        code, message, mail, credential,
      } = error;
      console.log(code, message, mail, credential);
    });
});
