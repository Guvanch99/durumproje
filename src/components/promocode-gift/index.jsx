import { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import './index.scss'

class PromoCodeGift extends Component {
  render() {
    const { t, present } = this.props
    return (
      <div className='promocode-gift'>
        {present.length>0&&<h1 className='promocde-gift__text'>{t('promoCodeGift.label')}</h1>}
        {
          present.map(({ name, src, description },index) => (
            <div key={index} className='promocode-gift__container'>
              <img src={src} alt='present' className='promocode-gift__image' />
              <div>
                <h1 className='promocode-gift__name'> {t(name)}</h1>
                <p className='promocode-gift__description'>{t(description)}</p>
              </div>
            </div>
          ))
        }

      </div>
    )
  }
}

export default withTranslation()(PromoCodeGift)

PromoCodeGift.propTypes = {
  present: PropTypes.array.isRequired,
  src: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
}
