const btnSignOut = document.getElementById('sign-out');
const postForm = document.getElementById('post-form');

// Evento de post
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getCurrentUserData()
    .then((currentUserData) => {
      savePost(postForm, currentUserData);
    });
});

// Evento sign-out
btnSignOut.addEventListener('click', () => {
  signOut()
    .then((user) => {
      console.log('Signed Out', user);
      window.location.replace('index.html');
    }).catch((error) => {
      console.error('Sign Out Error', error);
    });
});
