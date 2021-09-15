import { memo } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const ArticleName = ({ name }) => <h1 className="article-name">{name}</h1>

ArticleName.propTypes = {
  name: PropTypes.string.isRequired
}

export default memo(ArticleName)

