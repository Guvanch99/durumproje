import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { CartTable, Payment, PageLink, CartGift } from '..'

import { clearCart } from '../../redux/cart/actionCreators'

import { ROUTER_MENU } from '../../constants/routers'

import { ZERO } from '../../constants/variables'

import './index.scss'



const CartContent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const { cart: { gift }, auth: { user } } = useSelector(state => state)
  const [bonusCount, setBonusCount] = useState('')

  const handleChange = ({ target: { value } }) => {
    if (!isNaN(value))
      setBonusCount(value)
  }

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  return (
    <div className='cart-content'>
      <CartTable />
      <hr />
      {gift ? <CartGift gift={gift} /> : null}

      <div className='cart-content__links'>
        <PageLink
          direction={ROUTER_MENU}
          name={t('pageLink.continueShopping')}
        />
        {user  ? (
          <div className='cart-content__bonus'>
            <h1>{t('useBonusText')}</h1>
            <input maxLength={4} max={9999} className='cart-content__input' type='num' value={bonusCount}
                   onChange={handleChange} placeholder={t('bonusPlaceholder')} />
          </div>
        ) : null}
        <button
          onClick={clearCartHandler}
          className='cart-content__buttonClear'
        >
          {t('clear')}
        </button>
      </div>
      <Payment bonus={bonusCount} />
    </div>
  )
}

export default CartContent
