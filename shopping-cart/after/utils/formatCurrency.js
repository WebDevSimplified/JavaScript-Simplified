const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD"
})

export default function formatCurrency(amount) {
  return formatter.format(amount)
}
