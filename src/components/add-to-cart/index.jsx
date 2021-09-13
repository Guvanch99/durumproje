import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { addToCart } from '../../redux/cart/actionCreators'
import { AmountButtons } from '..'
import { ROUTER_CART } from '../../constants'
import PageLink from '../page-link'

import './index.scss'

const AddToCart = ({ singleProduct }) => {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)

  const increase = useCallback(() => {
    setAmount(prev => {
      let temp = ++prev
      return temp
    })
  }, [])

  const decrease = useCallback(() => {
    setAmount(prev => {
      let temp = --prev
      temp < 1 && (temp = 1)
      return temp
    })
  }, [])

  const addToCartProduct = () => {
    const payload = {
      amount,
      singleProduct
    }
    dispatch(addToCart(payload))
  }

  const { t } = useTranslation('translation')

  return (
    <div className="add-cart__container">
      <AmountButtons decrease={decrease} increase={increase} amount={amount} />
      <PageLink
        direction={ROUTER_CART}
        name={t('pageLink.toCart')}
        eventHandler={addToCartProduct}
      />
    </div>
  )
}

export default AddToCart

AddToCart.propTypes = {
  singleProduct: PropTypes.object.isRequired
}
