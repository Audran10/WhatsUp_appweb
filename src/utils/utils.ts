export function isEmpty(value: string) {
  if (value === "" || value === null || value === undefined) {
    return true;
  }
  return false;
}

export function isValidEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isValidPhoneNumber(phone: string) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}