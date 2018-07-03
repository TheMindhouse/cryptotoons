export const eth2wei = (eth: number): number => eth * 1000000000000000000

export const wei2eth = (wei: number, decimals?: number = 3): number => {
  const eth = wei / 1000000000000000000
  if (decimals > -1) {
    return parseFloat(eth.toFixed(decimals))
  }
  return eth
}
