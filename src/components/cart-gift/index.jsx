import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'

const CartGift = ({ gift }) => {
  const { t } = useTranslation('translation')

  return (
    <>
    <h1 className="cart__label">{t('cartGift.label')}</h1>
    <div className="cart-gift">
      {gift.map(({src,name,amount},index)=>(
        <div key={index} className="cart-gift__container">
          <img src={src} alt={name} className="cart-gift__image" />

          <h1 className="cart-gift__name">
            {t('cartGift.yourGift')}
            <span className="cart-gift__name-color">{t(name)}</span>
          </h1>

          <h1 className="cart-gift__amount">
            {t('cartGift.amount')}
            {'  '}
            <span className="cart-gift__amount-color">{t(amount)}</span>
          </h1>
        </div>
      ))}
    </div>
    </>
  )
}

export default memo(CartGift)

CartGift.propTypes = {
  gift: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.string,
    amount: PropTypes.number
  })
}
