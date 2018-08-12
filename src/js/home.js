const btnSignOut = document.getElementById('sign-out');
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');

// Evento de post
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getCurrentUserData()
    .then(userData => savePost(postForm, userData))
    .then(() => postForm.reset())
    .catch(error => console.log(error));
});

// Publicar posts
const renderPosts = (post, postID, isCurrentUser) => {
  console.log(post, postID, isCurrentUser);
  postsContainer.innerHTML += `<div class="row card container content-post">
    <div class="${isCurrentUser ? 'eucalyptus' : 'deep-koamaru'} bold-text valign-wrapper">
      <i class="material-icons">${post.private === true ? 'lock' : 'public'}</i>
      <span>${post.author.username}</span>
    </div>
    <p>${post.content}</p>
    ${isCurrentUser ? `<div class="general-margin-right">
      <div class="right">
        <button value="${postID}" class="waves-effect waves-light btn-small general-margin-left eucalyptus-bg">
          Eliminar
        </button>
      </div>
      <div class="right">
        <button value="${postID}" class="waves-effect waves-light btn-small eucalyptus-bg">
          Editar
        </button>
      </div>
    </div>` : ''}
    <div>
      <i value="${postID}" class="material-icons">favorite_border</i>
      <p class="lined-row">Likes <span id="like-count"></span></p>
    </div>
  </div>`;
};

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

onAuthState(renderPosts, postsContainer);
