// Validando inputs
window.validate = (input) => {
  let regex;
  switch (input.type) {
    case 'text':
      regex = /^[ña-z]+[ña-z ]{3,15}$/i;
      break;
    case 'email':
      regex = /^\w+([.-]?\w+)*@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
      break;
    case 'password':
      regex = /^[ña-z\d]{6,}$/i;
      break;
    // no default
  }
  return regex.test(input.value);
};
