const currencyFormat = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' })

export const formatDate = (data: Date) => data.toISOString().split('T')[0]

export const formatFunds = (funds: number) => currencyFormat.format(funds)