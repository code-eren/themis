export function moneyLine2contractOdds(moneyline: number) {
  if (moneyline < 0) {
    return Math.floor((1 + 100 / -moneyline) * 100);
  } else {
    return moneyline + 100;
  }
}

// console.log(moneyLine2contractOdds(-290))
