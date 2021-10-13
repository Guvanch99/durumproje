import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const UserPayment = ({ prevStep, handlePayment, value }) => {
  const { t } = useTranslation('translation')

  const payment = [
    {
      label: 'orderForm.paymentInfo.paymentCash',
      name: 'payment',
      value: 'cash'
    },
    {
      label: 'orderForm.paymentInfo.paymentCard',
      name: 'payment',
      value: 'card'
    }
  ]

  return (
    <div>
      {payment.map(({ label, name, value }, index) => (
        <div key={index} className='order-form__group'>
          <label className='order-form__label'>{t(label)}</label>
          <input
            onChange={handlePayment}
            value={value}
            type='radio'
            name={name}
            id={value}
            defaultChecked={index === 0}
          />
        </div>
      ))}
    </div>
  )
}

export default UserPayment

UserPayment.propTypes={
  prevStep:PropTypes.func.isRequired,
  handlePayment:PropTypes.func.isRequired,
  value:PropTypes.object.isRequired
}
