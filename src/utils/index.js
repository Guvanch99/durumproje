export const randomId = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const upperCaseString = str => str.trim().toUpperCase()

export const modifiedEmail = email => {
  const firstThreeLetters = email.substring(0, 3)
  const afterAt = email.split('@')[1]
  return firstThreeLetters + '......@' + afterAt
}
export const generatePassword = () => Math.floor(Math.random() * 1000000 + 1)
