import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { DATA } from '../../data'
import { ROUTER_CART } from '../../constants'
import { logOut } from '../../redux/auth/actionCreator'

import './index.scss'

const { menuAuthCart } = DATA

const MenuAuthCart = ({ sidebarVisibilityToggle }) => {
  const {
    cart: { totalItems },
    auth: { user }
  } = useSelector(state => state)
  const dispatch = useDispatch()
  const location = useLocation()
  const { t } = useTranslation('translation')
  const logout = () => {
    dispatch(logOut())
  }

  return (
    <ul className="menu">
      <li className="menu__list">
        <NavLink
          onClick={sidebarVisibilityToggle}
          className="menu__list-link"
          to={ROUTER_CART}
        >
          {t('menuAuthCart.cart.name')}
          <i className={`fas fa-cart-plus menu__list-icon`} />
          <span className="order-count">{totalItems}</span>
        </NavLink>
      </li>
      {!user ? (
        menuAuthCart.map(({ url, keyName, iconName }, index) => (
          <li key={index} className="menu__list">
            <NavLink
              onClick={sidebarVisibilityToggle}
              className="menu__list-link"
              to={{ pathname: url, state: { from: location.pathname } }}
            >
              {t(`menuAuthCart.${keyName}.name`)}
              <i className={`fas ${iconName} menu__list-icon`} />
            </NavLink>
          </li>
        ))
      ) : (
        <button onClick={logout} className="logout">
          {t('logout')}
        </button>
      )}
    </ul>
  )
}

export default memo(MenuAuthCart)

MenuAuthCart.propTypes = {
  sidebarVisibilityToggle: PropTypes.func
}
