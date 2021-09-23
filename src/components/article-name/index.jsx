import { memo } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const ArticleName = ({ name }) => <h1 className="article-name">{name}</h1>

export default memo(ArticleName)

ArticleName.propTypes = {
  name: PropTypes.string.isRequired
}
