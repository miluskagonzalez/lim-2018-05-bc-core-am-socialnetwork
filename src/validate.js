/* global emailSignUp */
// Validando inputs y registrando usuario
window.validate = (username, password, email, form) => {
  if (/^\w+([.-]?\w+)*@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/.test(email)
  && /^[ña-zA-Z\d]{6,}$/.test(password)
  && /^[ña-z ]{2,30}$/i.test(username)) {
    emailSignUp(username, email, password, form);
  }
};
