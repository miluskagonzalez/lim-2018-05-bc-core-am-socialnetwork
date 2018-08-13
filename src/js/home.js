/* eslint-disable no-unused-vars */
const btnSignOut = document.getElementById('sign-out');
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');

// Evento de post
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (postForm.content.value !== '') {
    getCurrentUserData()
    .then(userData => savePost(postForm, userData))
    .then(() => postForm.reset())
    .catch(error => console.log(error));
  } else {
    document.getElementById('empty-post').classList.add('modal-block');
  }
});

// Publicar posts
const renderPosts = (post, postID, isCurrentUser) => {
  console.log(post, postID, isCurrentUser);
  postsContainer.innerHTML += `<div class="row card container content-post">
    <p class="bold-text valign-wrapper">
      <span class="deep-koamaru">${post.author.username}</span>
      <i class="material-icons tiny eucalyptus right">${post.private === true ? 'lock' : 'public'}</i>
    </p>
    <p>${post.content}</p>
    ${isCurrentUser ? `<div class="general-margin-right">
      <div class="right">
        <button class="waves-effect waves-light btn-small general-margin-left red" onclick="btnDeletePost('${postID}')">
          <i class="material-icons">delete_forever</i>
        </button>
      </div>
      <div class="right">
        <button class="waves-effect waves-light btn-small eucalyptus-bg">
          <i class="material-icons">edit</i>
        </button>
      </div>
    </div>` : ''}
    <div class="valign-wrapper">
      <i class="material-icons left">favorite_border</i>
      <p> Likes <span id="like-count">12</span></p>
    </div>
  </div>`;
};

const closeModal = modalID => document.getElementById(modalID).classList.remove('modal-block');

// Evento borrar post
const btnDeletePost = (postID) => {
  document.getElementById('delete').classList.add('modal-block');
  document.getElementById('confirm-delete').addEventListener('click', () => {
    deletPost(postID)
      .then(() => closeModal('delete'))
      .catch(error => console.error('Error removing document: ', error));
  });
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

onAuthState(postsContainer, renderPosts);
