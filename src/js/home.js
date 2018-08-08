/* global signOut */
const btnSignOut = document.getElementById('sign-out');
// Evento sign-out
btnSignOut.addEventListener('click', () => {
  signOut()
    .then((user) => {
      console.log('Signed Out', user);
      window.location.replace('index.html')
    }).catch((error) => {
      console.error('Sign Out Error', error);
    });
});
