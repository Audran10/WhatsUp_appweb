export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateOnlyNumbers(phone: string) {
  return phone.match(/^\d+$/);
}

export function dateToStringInHours(date: Date) {
  return new Date(date).toLocaleString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  });
}
