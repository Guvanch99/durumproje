import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { CartContent, PageLink } from '../../components'
import { ROUTER_MENU } from '../../constants'

import './index.scss'

const Cart = () => {
  const { cart } = useSelector(state => state.cart)
  const { t } = useTranslation('translation')

  return (
    <div className="cart">
      {cart.length <= 0 ? (
        <PageLink direction={ROUTER_MENU} name={t('pageLink.addBasket')} />
      ) : (
        <CartContent />
      )}
    </div>
  )
}

export default Cart
