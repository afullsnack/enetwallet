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

function randomNumber() {
  return Math.floor(Math.random() * 100);
}
function generateRandomColor(): string {
  // Generating a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Converting the number to a hexadecimal string and padding with zeros
  return `#${randomColor.toString(16).padStart(6, "0")}`;
}
const tokenNames = ["Bitcoin", "Ethereum", "Tether", "Solana", "Polkadot"];
export const DONUT_CHART_DATA = (numberPoints = 5) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    value: randomNumber(),
    color: generateRandomColor(),
    label: tokenNames[index],
  }));

export const DATA_LINE_CHART = Array.from({ length: 16 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 30 + 20 * Math.random(),
}));

export function calculateGradientPoints(
  radius: number,
  startAngle: number,
  endAngle: number,
  centerX: number,
  centerY: number,
) {
  // Calculate the midpoint angle of the slice for a central gradient effect
  const midAngle = (startAngle + endAngle) / 2;

  // Convert angles from degrees to radians
  const startRad = (Math.PI / 180) * startAngle;
  const midRad = (Math.PI / 180) * midAngle;

  // Calculate start point (inner edge near the pie's center)
  const startX = centerX + radius * 0.5 * Math.cos(startRad);
  const startY = centerY + radius * 0.5 * Math.sin(startRad);

  // Calculate end point (outer edge of the slice)
  const endX = centerX + radius * Math.cos(midRad);
  const endY = centerY + radius * Math.sin(midRad);

  return { startX, startY, endX, endY };
}
