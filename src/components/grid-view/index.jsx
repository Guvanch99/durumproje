import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { ROUTER_MENU } from '../../constants'

import './index.scss'

const GridView = ({ products }) => {
  const { t } = useTranslation('translation')

  return (
    <div className="grid">
      {products.map(({ id, name, src, price }) => (
        <div key={id} className="grid__container">
          <img loading="lazy" className="grid__image" src={src} alt={name} />
          <div className="grid__info">
            <h1 className="food__name">{t(name)}</h1>
            <h3 className="food__price">
              {t('productPrice')}
              {price}
              {t('productPriceCurrency')}
            </h3>
          </div>
          <NavLink className="product__buy_link" to={`${ROUTER_MENU}/${id}`}>
            <i className="fas fa-shopping-bag product__buy_icon" />
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default GridView

GridView.propTypes = {
  products: PropTypes.array.isRequired
}
