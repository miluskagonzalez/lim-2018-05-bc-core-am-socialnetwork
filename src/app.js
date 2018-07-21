//SDK de Facebook para JavaScript
window.fbAsyncInit = () => {
  FB.init({
    appId: '198195514191903',
    cookie: true,
    xfbml: true,
    version: 'v3.0'
  });
  FB.AppEvents.logPageView();
};
(d, s, id) => {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s); 
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
};
(document, 'script', 'facebook-jssdk');

// Estado de inicio de sesion
FB.getLoginStatus((response) => {
  statusChangeCallback(response);
});
const ref = new firebase('https://social-network-8099a.firebaseapp.com/__/auth/handler');
document.getElementById('login-facebook').addEventListener('click', () => {
  ref.autWithOAuthPopup('facebook', (error, data) => {
    if (error) {
      console.log('error', error.message);
    } else {
      console.log('ok', data);
    };
  });
});