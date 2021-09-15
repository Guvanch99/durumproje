export const randomId = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const upperCaseString=(str)=>str.trim().toUpperCase()