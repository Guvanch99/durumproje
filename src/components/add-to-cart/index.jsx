import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { AmountButtons, PageLink } from '..'

import { addToCart } from '../../redux/cart/actionCreators'

import { ROUTER_CART } from '../../constants/routers'

import './index.scss'

const AddToCart = ({ singleProduct }) => {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)

  const increase = useCallback(() => {
    setAmount(prev => {
      return ++prev
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
    console.log("addd",singleProduct)
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
