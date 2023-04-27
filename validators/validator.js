export function emptyStringValidator(data) {
  if (data.length === 0) {
    // console.log('emptystring')
    return false;
  } else {
    // console.log('no empty string')
    return true;
  }
}

export function emailValidator(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  if (re.test(email)) {
    return true;
  } else return false;
}

export function passwordLengthValidator(password) {
  if (password.length > 6) {
    return true;
  } else return false;
}
