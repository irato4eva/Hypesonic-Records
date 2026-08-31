// TODO: swap USD_TO_NGN for a live FX rate (e.g. fetched from your payment
// provider or an FX API) if you want the NGN price to track the market rate
// automatically. Update this manually in the meantime.
export const USD_TO_NGN = 1350

export const formatUSD = (n: number) =>
  `$${n.toLocaleString('en-US')}`

export const formatNGN = (n: number) =>
  `₦${Math.round(n).toLocaleString('en-NG')}`

export const usdToNgn = (usd: number) => usd * USD_TO_NGN
