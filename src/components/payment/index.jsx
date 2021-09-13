import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { ROUTER_CHECKOUT, ROUTER_SIGN_UP, SHIPPING_FEE } from '../../constants'
import { PageLink } from '..'

import './index.scss'

const Payment = () => {
  const { t } = useTranslation('translation')
  const {
    cart: { totalAmount },
    auth: { user }
  } = useSelector(state => state)

  let total = totalAmount + SHIPPING_FEE

  return (
    <div className="payment">
      <h2 className="payment__subtotal">
        {t('payment.subTotal', { totalAmount })}
      </h2>
      <p className="payment__shipping"> {t('payment.shipping')}</p>
      <hr />
      <h1 className="payment__total"> {t('payment.orderTotal', { total })}</h1>

      {user ? (
        <PageLink
          name={t('pageLink.goToCheckout')}
          direction={ROUTER_CHECKOUT}
        />
      ) : (
        <PageLink name={t('pageLink.signUp')} direction={ROUTER_SIGN_UP} />
      )}
    </div>
  )
}

export default Payment
