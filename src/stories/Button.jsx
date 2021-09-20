import PropTypes from 'prop-types'

import style from './Button.module.scss'

const Button = ({ name, handleClick, color }) => (
  <button style={{ background: color }} onClick={handleClick}>
    {name}
  </button>
)
export default Button

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func
}
