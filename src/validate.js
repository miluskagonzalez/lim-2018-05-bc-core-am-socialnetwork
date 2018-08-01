// Validando inputs y registrando usuario
window.validate = () => {
  if (/^\w+([\.-]?\w+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(email.value)
  && /^[ña-zA-Z\d]{6,}$/.test(password.value)
  && /^[ña-z ]{2,30}$/i.test(username.value)) {
    emailSignUp(username.value, email.value, password.value, signUpForm);
  }
};