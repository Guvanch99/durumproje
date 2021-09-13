import { memo } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const AmountButtons = ({ amount, increase, decrease, styleTable }) => (
  <div className={styleTable ? 'amount-for-table' : 'amount'}>
    <button
      className={styleTable ? 'amount-for-table__sign' : 'amount__sign'}
      onClick={decrease}
    >
      -
    </button>
    <h2
      className={styleTable ? 'amount-for-table__counter' : 'amount__counter'}
    >
      {amount}
    </h2>
    <button
      className={styleTable ? 'amount-for-table__sign' : 'amount__sign'}
      onClick={increase}
    >
      +
    </button>
  </div>
)

export default memo(AmountButtons)

AmountButtons.propTypes = {
  amount: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  styleTable: PropTypes.bool
}
AmountButtons.defaultProps = {
  styleTable: false
}
