// Validando inputs de registro
window.validateUsername = (username) => {
  const usernameRegex = /^[ña-z ]{3,15}$/i;
  return usernameRegex.test(username);
};
window.validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
  return emailRegex.test(email);
};
window.validatePassword = (password) => {
  const passwordRegex = /^[ña-z\d]{6,}$/i;
  return passwordRegex.test(password);
};
