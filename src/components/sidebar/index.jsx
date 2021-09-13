import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { MenuAuthCart, ToggleButton, Language } from '../'
import { DATA } from '../../data'
import { ROUTER_HOME } from '../../constants'

import './index.scss'

const { logo, links } = DATA

const Sidebar = ({ sidebarVisibilityToggle, lang, changeLanguageHandler }) => {
  const { t } = useTranslation('translation')

  const sideBarLogo = (
    <NavLink to={ROUTER_HOME}>
      <div>
        <img loading="lazy" className="logo" src={logo} alt="durum" />
      </div>
    </NavLink>
  )

  return (
    <div className="sidebar">
      <ul className="sidebar__menu">
        {sideBarLogo}
        {links.map(({ url, keyName }, index) => (
          <li className="sidebar__menu-list" key={index}>
            <NavLink
              onClick={sidebarVisibilityToggle}
              className="sidebar__menu-link"
              to={url}
            >
              {t(`links.${keyName}.name`)}
            </NavLink>
          </li>
        ))}
      </ul>
      <MenuAuthCart sidebarVisibilityToggle={sidebarVisibilityToggle} />
      <Language lang={lang} changeLanguageHandler={changeLanguageHandler} />
      <ToggleButton />
      <button onClick={sidebarVisibilityToggle} className="sidebar__times">
        <i className="fas fa-times" />
      </button>
    </div>
  )
}

export default memo(Sidebar)

Sidebar.propTypes = {
  sidebarVisibilityToggle: PropTypes.func.isRequired,
  lang: PropTypes.string,
  changeLanguageHandler: PropTypes.func
}
