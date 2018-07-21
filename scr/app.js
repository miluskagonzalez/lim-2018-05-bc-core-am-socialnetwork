const login = document.getElementById('login');
const logout = document.getElementById('logout');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnRegister = document.getElementById('btnRegister')
const btnSignin = document.getElementById('btnSignin')
const btnLogout = document.getElementById('btnLogout')


btnRegister.addEventListener('click', () => {
    // le pasamos con value, para probar.
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then(() => {
    console.log('Usuario Creado');
    login.classList.add("hiden");
    logout.classList.remove("hiden");
    username.innerHTML = ' Hola Claudia';

  })
  .catch(function(error) {
    console.log(error.code ,' : ' , error.message);
  });
})

