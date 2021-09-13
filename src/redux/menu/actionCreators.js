import { GET_ALL_PRODUCTS, ON_CHANGE, FILTER_PRODUCTS } from './type'
import { DB } from '../../core/axios'

export const getAllProducts = payload => ({
  type: GET_ALL_PRODUCTS,
  payload
})
export const onChangeHandler = payload => ({
  type: ON_CHANGE,
  payload
})
export const filterProducts = () => ({
  type: FILTER_PRODUCTS
})
export const fetchAllProducts = () => dispatch =>
  DB('/all-products').then(({ data }) => dispatch(getAllProducts(data)))
