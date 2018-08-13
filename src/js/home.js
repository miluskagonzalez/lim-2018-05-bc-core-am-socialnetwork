/* eslint-disable no-unused-vars */
const btnSignOut = document.getElementById('sign-out');
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');

// Evento de post
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (postForm.content.value.trim() === '') {
    document.getElementById('empty-post').classList.add('modal-block');
  } else {
    getCurrentUserData()
      .then(userData => savePost(postForm, userData))
      .then(() => postForm.reset())
      .catch(error => console.log(error));
  }
});

// Publicar posts
const renderPosts = (post, postID, isCurrentUser) => {
  console.log(post, postID, isCurrentUser);
  postsContainer.innerHTML += `<div id="${postID}" class="row card container content-post">
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
        <button class="waves-effect waves-light btn-small eucalyptus-bg" onclick="btnEditPost('${postID}', '${post.content}', ${post.private})">
          <i class="material-icons">edit</i>
        </button>
      </div>
    </div>` : ''}
    <div class="valign-wrapper">
      <i class="material-icons eucalyptus left btn-custom" onclick="btnLike('${postID}', '${post.likes}')">favorite</i>
      <p> Likes <span>${post.likes}</span></p>
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

const btnEditPost = (postID, postContent, private) => {
  document.getElementById(postID).innerHTML = `<form class="col s12" id="edit-form">
  <div class="row">
    <div class="input-field col s11 center-align">
      <i class="material-icons prefix active">edit</i>
      <textarea id="edit" name="content" class="materialize-textarea auto-height">${postContent}</textarea>
      <label class="active" for="edit">Edita el contenido de tu post y/o la privacidad</label>
    </div>
    <div class="general-margin-right">
      <div class="right">
        <button class="waves-effect waves-light btn-small eucalyptus-bg general-margin-left">Guardar</button>
      </div>
      <div class="switch right-align">
        <label>
          Público
          <input name="privacy" type="checkbox" ${private === true ? 'checked' : ''}>
          <span class="lever"></span>
          Privado
        </label>
      </div>
    </div>
  </div>
</form>`
// TO DO: que la información ingresada se guarde en el mismo post (con update) 
}

// Evento likear post
const btnLike = (postID, postLikes) => {
  const likeCount = parseInt(postLikes, 10) + 1;
  updateLikeCount(postID, likeCount);
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
