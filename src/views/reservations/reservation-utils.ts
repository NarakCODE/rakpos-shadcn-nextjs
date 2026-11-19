export type ReservationDateRange = 'all' | 'today' | 'upcoming' | 'past'

export function getTodayDateValue() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return date.getFullYear() + '-' + month + '-' + day
}

export function formatReservationDateTime(date: string, time: string) {
  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date + 'T00:00:00'))

  return dateLabel + ', ' + formatReservationTime(time)
}

export function formatReservationTime(time: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date('1970-01-01T' + time + ':00'))
}

export function formatReservationDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date + 'T00:00:00'))
}
