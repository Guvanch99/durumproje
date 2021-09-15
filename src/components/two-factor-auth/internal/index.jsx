import PropTypes from 'prop-types'

const TwoFactorAuthInput = ({ name, value, handleChange,onkeydown }) => (

  <input
    type='tel'
    name={name}
    value={value}
    min={0}
    max={9}
    step='1'
    placeholder='·'
    maxLength='1'
    onChange={handleChange}
    autoComplete='one-time-code'
    className='twoFactorAuth__input'
    onKeyDown={onkeydown}
  />
)

TwoFactorAuthInput.propTypes={
  name:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  handleChange:PropTypes.func.isRequired,
  onKeyDown:PropTypes.func
}

export default TwoFactorAuthInput