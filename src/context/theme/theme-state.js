import { useState, useEffect } from 'react'

import ThemeContext from './theme-context'

const ThemeState = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false)
  const changeThemeDark = () => setThemeDark(!themeDark)

  useEffect(() => {
    localStorage.getItem('theme') &&
      setThemeDark(JSON.parse(localStorage.getItem('theme')))
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themeDark))
  }, [themeDark])

  return (
    <ThemeContext.Provider value={{ themeDark, changeThemeDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeState
