import PropTypes from 'prop-types'

const TwoFactorAuthInput = ({
  name,
  handleChange,
  inputRefs,
  handleDelete,
  value
}) => (
  <input
    type="tel"
    min={0}
    max={9}
    step="1"
    placeholder="·"
    maxLength="6"
    autoComplete="one-time-code"
    className="twoFactorAuth__input"
    name={name}
    value={value}
    ref={input => (inputRefs[name] = input)}
    onChange={e => handleChange(e, name)}
    onKeyDown={e => handleDelete(e, name)}
  />
)

export default TwoFactorAuthInput

TwoFactorAuthInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputRefs: PropTypes.array.isRequired,
  name: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleBackspace: PropTypes.func,
  onPaste: PropTypes.func
}
