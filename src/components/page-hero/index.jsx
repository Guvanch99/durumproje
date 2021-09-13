import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { ROUTER_HOME, ROUTER_MENU } from '../../constants'

import './index.scss'

const PageHero = ({ title, menu }) => {
  const { t } = useTranslation('translation')

  return (
    <section className="section">
      <h1 className="section__text">
        <NavLink className="section__link" to={ROUTER_HOME}>
          {t('pageHero.home')}{' '}
        </NavLink>
        {menu && (
          <>
            <span className="section__sign">&gt;</span>
            <NavLink className="section__middle-page" to={ROUTER_MENU}>
              {t('pageHero.menu')}{' '}
            </NavLink>
          </>
        )}
        <span className="section__sign">&gt;</span> {title}
      </h1>
    </section>
  )
}

export default memo(PageHero)

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.bool
}

PageHero.defaultProps = {
  menu: false
}
