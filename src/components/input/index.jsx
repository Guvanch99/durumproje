import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

const Input = ({
  name,
  value,
  label,
  error,
  type,
  onChange,
  required,
  handleBlur,
  disabled
}) => (
  <div className="input-container">
    <label htmlFor={name} className="input-container__label">
      {label}
    </label>
    <input
      className={classNames('input-container__input', { error })}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      placeholder={label}
      required={required}
      autoFocus={name === 'userName'}
      onBlur={handleBlur}
      disabled={disabled}
    />

    {error && <span className="input-container__error">{error}</span>}
  </div>
)

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  focus: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  handleBlur: PropTypes.func
}
