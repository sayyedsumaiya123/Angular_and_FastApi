export const validInteger = value => /^[+-]?\d+$/.test(String(value).trim()) && Number.isSafeInteger(Number(value))

export function validateEvent(title, seats) {
  const errors = []
  if (title.trim().length < 3 || title.length > 100) errors.push({ loc: ['body', 'title'], msg: 'Title must contain 3–100 characters' })
  if (!validInteger(seats) || Number(seats) <= 0) errors.push({ loc: ['body', 'total_seats'], msg: 'Seats must be a positive integer' })
  return errors
}
