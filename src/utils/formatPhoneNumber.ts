// 0611121212 => 06 11 12 12 12

const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length !== 10) {
    return phoneNumber;
  }

  return phoneNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");

};

export default formatPhoneNumber;
