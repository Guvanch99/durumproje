import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'

const InformationList = ({ info }) => {
  const { t } = useTranslation('translation')

  return (
    <ul className="information">
      {info.map(({ icon, text }, index) => (
        <li className="information__list" key={index}>
          <i className={`${icon} information__icon`} />
          <h2 className="information__text">{t(text)}</h2>
        </li>
      ))}
    </ul>
  )
}

export default memo(InformationList)

InformationList.propTypes = {
  info: PropTypes.array.isRequired
}
