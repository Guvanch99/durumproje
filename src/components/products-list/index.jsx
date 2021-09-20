import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { ListView, GridView } from '..'

import './index.scss'

const ProductsList = ({ view }) => {
  const allProducts = useSelector(state => state.menu.filteredProducts)

  const ViewBar = view ? ListView : GridView

  return <ViewBar products={allProducts} />
}

export default ProductsList

ProductsList.propTypes = {
  view: PropTypes.bool.isRequired
}
