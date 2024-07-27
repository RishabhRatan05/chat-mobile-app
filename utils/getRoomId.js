export const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort()
  const roomId = sortedIds.join("-")
  return roomId
}

export function formatDate(isoString) {
  // Parse the ISO string into a Date object
  let date = new Date(isoString)

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Augt",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  // Extract the components of the date
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  // Format the date string
  let formattedDate = ""
  if (year == new Date().getFullYear()) {
    if (month == new Date().getMonth()) {
      if (day == new Date().getDate()) {
        formattedDate = `${hours}:${minutes}`
      } else {
        formattedDate = `${day} ${monthNames[month]}`
      }
    } else {
      formattedDate = `${monthNames[month]} `
    }
  } else {
    formattedDate = `${year}`
  }
  return formattedDate
}
