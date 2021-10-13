import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { Modal, UserAddress, UserInfo, UserPayment } from '..'

import { clearOrder, order } from '../../redux/cart/actionCreators'

import {
  INTEGER_VALIDATION,
  PHONE_VALIDATION,
  INTEGER_AND_ZERO_VALIDATION
} from '../../constants/regexes'

import { BONUS_COEFFICIENT } from '../../constants/variables'

import './index.scss'

const OrderForm = () => {
  const {
    auth: { user },
    cart: { cart, gift, totalAmount, totalItems }
  } = useSelector(state => state)

  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({
    userName: user.userName,
    email: user.email,
    phone: '',
    street: '',
    house: '',
    entrance: '',
    storey: '',
    payment: 'cash'
  })
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    phone: '',
    street: '',
    house: '',
    entrance: '',
    storey: ''
  })

  const [step, setStep] = useState(1)

  const { userName, email, phone, street, house, entrance, storey, payment } = userInfo

  const phoneValidation = () => {
    !PHONE_VALIDATION.test(phone) &&
    setErrors({ ...errors, phone: 'orderForm.orderErrors.phone' })
  }

  const streetValidation = () => {
    street.length < 3 &&
    setErrors({ ...errors, street: 'orderForm.orderErrors.street' })
  }

  const houseValidation = () => {
    !INTEGER_AND_ZERO_VALIDATION.test(house) &&
    setErrors({ ...errors, house: 'orderForm.orderErrors.house' })
  }

  const entranceValidation = () => {
    !INTEGER_VALIDATION.test(entrance) &&
    setErrors({ ...errors, entrance: 'orderForm.orderErrors.entrance' })
  }

  const storeyValidation = () => {
    !INTEGER_AND_ZERO_VALIDATION.test(storey) &&
    setErrors({ ...errors, storey: 'orderForm.orderErrors.storey' })
  }

  const prevStep = () => setStep(step - 1)

  const nextStep = () => setStep(step + 1)

  const handleChange = e => {
    const { name, value } = e.target
    errors[name] && setErrors({ ...errors, [name]: '' })
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handlePayment = (e) => setUserInfo({ ...userInfo, payment: e.target.value })

  const orderMenu = async (e) => {
    e.preventDefault()

    let updatedUser = {
      userName,
      email
    }

    let address = {
      street,
      house,
      entrance,
      storey,
      payment
    }
    let newBonus = Number((totalAmount * BONUS_COEFFICIENT).toFixed(2))

    const userBought = {
      timeOrder: moment().format('DD MM YYYY hh:mm:ss'),
      deliveryTime: moment().add(30, 'm').format('DD MM YYYY hh:mm:ss'),
      user: updatedUser,
      cart,
      gift,
      address,
      totalItems,
      totalAmount
    }

    await dispatch(order(userBought, newBonus))
    dispatch(clearOrder())
    nextStep()
  }
  switch (step) {
    case 1:
      return (
        <UserInfo nextStep={nextStep}
                  handleChange={handleChange}
                  phoneValidation={phoneValidation}
                  values={userInfo}
                  errors={errors} />
      )
    case 2:
      return (
        <UserAddress nextStep={nextStep}
                     prevStep={prevStep}
                     handleChange={handleChange}
                     streetValidation={streetValidation}
                     houseValidation={houseValidation}
                     entranceValidation={entranceValidation}
                     storeyValidation={storeyValidation}
                     values={userInfo}
                     errors={errors} />
      )
    case 3:
      return (
        <UserPayment prevStep={prevStep}
                     handlePayment={handlePayment}
                     orderMenu={orderMenu}
                     value={userInfo.payment} />
      )
    case 4:
      return (
        <Modal />
      )

  }
}
export default OrderForm

