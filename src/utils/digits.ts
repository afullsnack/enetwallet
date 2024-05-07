export function checkNumber(num: number) {
  if (num >= 1000000000) {
    const baseDigit = Math.floor(num / 1000000000);
    return baseDigit + "B";
  } else if (num >= 1000000) {
    const baseDigit = Math.floor(num / 1000000);
    return baseDigit + "M";
  } else if (num >= 1000000000000) {
    const baseDigit = Math.floor(num / 1000000000000);
    return baseDigit + "T";
  } else {
    return num.toString();
  }
}

export function isPositive(num: number) {
  return num >= 0;
}
