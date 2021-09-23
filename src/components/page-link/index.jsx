import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

const PageLink = ({ direction, name, eventHandler }) => (
  <NavLink
    onClick={eventHandler ? eventHandler : null}
    className="page-link"
    to={direction}
  >
    {name}
  </NavLink>
)

export default memo(PageLink)

PageLink.propTypes = {
  direction: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  eventHandler: PropTypes.func
}


