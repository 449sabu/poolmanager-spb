export const calculateADA = (lovelace: string) => {
  if (lovelace.length > 12) {
    const num = parseInt(lovelace) / 1000000000000;
    return num.toFixed(1) + 'M';
    // 単位 M
  }
  if (lovelace.length > 9) {
    const num = parseInt(lovelace) / 1000000000;
    return num.toFixed(1) + 'K';
    // 単位 K
  }
  if (lovelace.length < 10) {
    const num = parseInt(lovelace) / 1000000;
    return num.toFixed(1);
    // 単位 ADA
  }
};
