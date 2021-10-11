import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context'

export const useTheme = () => useContext(ThemeContext)

export const useDebounced = value => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  let timer

  useEffect(
    () => {
      timer = setTimeout(() => setDebouncedValue(value), 200)

      return () => clearTimeout(timer)
    }, [value])

  return debouncedValue
}
