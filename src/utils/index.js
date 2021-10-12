export const randomId = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const upperCaseString = str => str.trim().toUpperCase()

export const modifiedEmail = email => {
  const firstThreeLetters = email.substring(0, 3)
  const afterAt = email.split('@')[1]
  return firstThreeLetters + '......@' + afterAt
}
export const generatePassword = () => Math.floor(Math.random() * 1000000 + 1)

export const debounce = (fn, ms) => {
  let timeout
  return function() {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}

export const throttle = (fn, ms) => {
  let isThrottle = false
  let savedArgs
  let savedThis

  function wrapper() {
    if (isThrottle) {
      savedArgs = arguments
      savedThis = this
      return
    }

    fn.apply(this, arguments)

    isThrottle = true

    setTimeout(() => {
      isThrottle = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = false
      }
    }, ms)
  }

  return wrapper
}

