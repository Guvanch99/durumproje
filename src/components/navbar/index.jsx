import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { MenuAuthCart, ToggleButton, Language } from '..'
import { DATA } from '../../data'
import { ROUTER_HOME } from '../../constants'

import './index.scss'

const { logo, links } = DATA

const Navbar = ({ sidebarVisibilityToggle, lang, changeLanguageHandler }) => {
  const { t } = useTranslation('translation')

  let navLogo = (
    <NavLink className="logo" to={ROUTER_HOME}>
      <div>
        <img className="navbar__logo" src={logo} alt="durum" />
      </div>
    </NavLink>
  )

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {navLogo}
        <ul className="navbar__menu">
          {links.map(({ url, keyName }, index) => (
            <li className="navbar__menu_list" key={index}>
              <NavLink className="navbar__menu_link" to={url}>
                {t(`links.${keyName}.name`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <MenuAuthCart />
      <Language lang={lang} changeLanguageHandler={changeLanguageHandler} />
      <ToggleButton />
      <button onClick={sidebarVisibilityToggle} className="navbar__hamburger">
        <i className="fas fa-bars" />
      </button>
    </nav>
  )
}

export default memo(Navbar)

Navbar.propTypes = {
  sidebarVisibilityToggle: PropTypes.func.isRequired,
  lang: PropTypes.string,
  changeLanguageHandler: PropTypes.func
}
