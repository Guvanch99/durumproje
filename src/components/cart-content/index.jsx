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
  const { gift } = useSelector(state => state.cart)
  const [bonusCount, setBonusCount] = useState('')

  const handleChange = (e) => {
    const { target: { value } } = e
    e.preventDefault()
    const financialGoal = (e.target.validity.valid) ? value : bonusCount
    setBonusCount(financialGoal)
  }

  const clearCartHandler = () => {
    dispatch(clearCart())
  }
  const useBonus = (e) => {
    e.preventDefault()

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
        <div className='cart-content__bonus'>
          <h1>{t('useBonusText')}</h1>
          <input className='cart-content__input' type='number' min={1} max={5} pattern='[1-9]*' value={bonusCount}
                 onChange={handleChange}  placeholder={t('bonusPlaceholder')}/>
          <button className='bonus__button'
                  disabled={bonusCount===''}
                  onClick={useBonus}>{bonusCount ==='' ? t('bonusZero') : t('promoCode.buttonSubmit')}</button>
        </div>
        <button
          onClick={clearCartHandler}
          className='cart-content__buttonClear'
        >
          {t('clear')}
        </button>
      </div>
      <Payment />
    </div>
  )
}

export default CartContent
