const carBrands = ['Tesla', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Lexus', 'Hyundai', 'Ford', 'Renault', 'Fiat'];
const carModels = ['Model X', 'X5', 'E-tron', 'A5', 'Supra', 'Rx 350', 'Tucson', 'Focus', 'Logan', 'Uno'];

export function generateCarName() {
  return `${carBrands[Math.floor(Math.random() * carBrands.length)]} ${carModels[Math.floor(Math.random() * carModels.length)]}`;
}

export function generateCarColor() {
  const chars = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }
  return color;
}
