const getFormattedDate = date => {
  const year = date.getFullYear()

  const rawMonth = date.getMonth() + 1
  const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth

  const rawDay = date.getDate()
  const day = rawDay < 10 ? `0${rawDay}` : rawDay

  return `${year}-${month}-${day}`
}

export default getFormattedDate
