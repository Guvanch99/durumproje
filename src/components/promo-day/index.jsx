import { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import { DATA } from '../../data'
import { PageHero } from '..'

import './index.scss'

class PromoDay extends PureComponent {
  render() {
    const { promoImage } = DATA
    const { t } = this.props

    return (
      <>
        <PageHero title={t('pageHero.promotions')} />
        <h1 className="date">{t('promoDay.date')}</h1>
        <div className="promoday">
          <img className="promoday__image" src={promoImage} alt="promo" />
          <div className="promoday__info">
            <h2 className="promoday__text">{t('promoDay.label')}</h2>
            <h3 className="promoday__time">
              {t('promoDay.time')}{' '}
              <span className="promoday__time_color">12.08.2021</span>
            </h3>
            <hr />
            <h1 className="promoday__description">
              {t('promoDay.description')} &#128522; &#128522; &#128522;
            </h1>
            <p className="promoday__obligations">
              {t('promoDay.obligation')}
              <span className="promoday__obligations_color">
                {t('promoDay.obligationRule')}
              </span>
              &#128567;
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default withTranslation()(PromoDay)
