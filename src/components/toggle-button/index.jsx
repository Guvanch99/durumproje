import { memo } from 'react'
import { useTheme } from '../../hooks'

import './index.scss'

const ToggleButton = () => {
  const { themeDark, changeThemeDark } = useTheme()

  return (
    <div className="toggle">
      <input
        checked={themeDark}
        onChange={changeThemeDark}
        className="toggle__button"
        type="checkbox"
        id="toggle"
      />
      <label className="toggle__background" htmlFor="toggle">
        <span className="toggle__circle" />
      </label>
    </div>
  )
}

export default memo(ToggleButton)
