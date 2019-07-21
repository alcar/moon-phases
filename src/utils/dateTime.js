export const formatDate = date => {
  const year = date.getFullYear()

  const rawMonth = date.getMonth() + 1
  const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth

  const rawDay = date.getDate()
  const day = rawDay < 10 ? `0${rawDay}` : rawDay

  return `${year}-${month}-${day}`
}

const formatTime = time => (time < 10 ? `0${time}` : time.toString())

export const formatTimezoneOffset = offset => {
  const signal = offset > 0 ? '-' : '+'

  const hours = Math.floor(offset / 60)

  const formattedHours = formatTime(hours)

  const minutes = offset % 60

  const formattedMinutes = formatTime(minutes)

  return `${signal}${formattedHours}:${formattedMinutes}`
}
