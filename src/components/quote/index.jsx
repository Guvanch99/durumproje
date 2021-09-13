import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { ArticleName } from '..'

import './index.scss'

const Quote = ({ randomQuote }) => {
  const { t } = useTranslation('translation')

  return (
    <div className="quote">
      <ArticleName name={t('articleNames.randomQuote')} />
      <h2 className="quote__value">{randomQuote}</h2>
    </div>
  )
}

export default memo(Quote)

Quote.propTypes = {
  value: PropTypes.string,
  tag: PropTypes.string
}
