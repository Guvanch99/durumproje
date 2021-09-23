import PropTypes from 'prop-types'

import TwoFactorAuthInput from '../two-factor-auth/internal'

import { THIRD_ELEMENT } from '../../constants/variables'

import styles from './inputs.module.scss'

const DynamicInputs = ({ handleChange, inputRefs, handleDelete, values }) =>
  values.map((input, idx) => (
    <div className={styles.inputContainer} key={idx}>
      <TwoFactorAuthInput
        inputRefs={inputRefs}
        handleChange={handleChange}
        name={idx}
        value={input}
        handleDelete={handleDelete}
      />
      {idx === THIRD_ELEMENT ? <div className={styles.spacer}>-</div> : null}
    </div>
  ))

export default DynamicInputs

DynamicInputs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputRefs: PropTypes.array.isRequired,
  handleBackspace: PropTypes.func,
  values: PropTypes.array.isRequired
}
