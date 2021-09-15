import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'

class PromoCodeGift extends Component {
  render() {
    const { t, present } = this.props

    return (
      <div className='promoCode-gift'>
       <h1 className='promoCode-gift__text'>{t('promoCodeGift.label')}</h1>
        {
          present.map(({ name, src, description },index) => (
            <div key={index} className='promoCode-gift__container'>
              <img src={src} alt='present' className='promoCode-gift__image' />
              <div>
                <h1 className='promoCode-gift__name'> {t(name)}</h1>
                <p className='promoCode-gift__description'>{t(description)}</p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

PromoCodeGift.propTypes = {
  present: PropTypes.array.isRequired,
  src: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
}

export default withTranslation()(PromoCodeGift)

