export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(amount)
}
