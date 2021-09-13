import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { Input, Modal, Portal } from '..'
import { DB } from '../../core/axios'
import { clearOrder } from '../../redux/cart/actionCreators'
import {
  INTEGER_VALIDATION,
  PHONE_VALIDATION,
  INTEGER_AND_ZERO_VALIDATION
} from '../../constants'
import './index.scss'

const OrderForm = () => {
  const { t } = useTranslation('translation')
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
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { userName, email, phone, street, house, entrance, storey, payment } =
    userInfo

  const isButtonDisabled =
    !userName ||
    !email ||
    !phone ||
    !street ||
    !house ||
    !entrance ||
    !storey ||
    errors.userName ||
    errors.email ||
    errors.phone ||
    errors.street ||
    errors.house ||
    errors.entrance ||
    errors.storey
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
  /* eslint-disable */
  const orderData = useMemo(
    () => ({
      mainInfo: [
        {
          name: 'userName',
          value: userName,
          label: 'orderForm.mainInfo.user',
          type: 'text',
          disabled: true
        },
        {
          name: 'email',
          value: email,
          label: 'orderForm.mainInfo.email',
          type: 'email',
          disabled: true
        },
        {
          name: 'phone',
          value: phone,
          label: 'orderForm.mainInfo.phone',
          error: errors.phone,
          type: 'text',
          functionError: phoneValidation
        }
      ],
      address: [
        {
          name: 'street',
          value: street,
          label: 'orderForm.addressInfo.street',
          error: errors.street,
          type: 'text',
          functionError: streetValidation
        },
        {
          name: 'house',
          value: house,
          label: 'orderForm.addressInfo.house',
          error: errors.house,
          type: 'text',
          functionError: houseValidation
        },
        {
          name: 'entrance',
          value: entrance,
          label: 'orderForm.addressInfo.entrance',
          error: errors.entrance,
          type: 'text',
          functionError: entranceValidation
        },
        {
          name: 'storey',
          value: storey,
          label: 'orderForm.addressInfo.storey',
          error: errors.storey,
          type: 'text',
          functionError: storeyValidation
        }
      ],
      payment: [
        {
          label: 'orderForm.paymentInfo.paymentCash',
          name: 'payment',
          value: 'cash'
        },
        {
          label: 'orderForm.paymentInfo.paymentCard',
          name: 'payment',
          value: 'card'
        }
      ]
    }),
    [
      userName,
      email,
      phone,
      street,
      house,
      entrance,
      storey,
      errors.userNameError,
      errors.emailError,
      errors.phoneError,
      errors.streetError,
      errors.houseError,
      errors.entranceError,
      errors.storeyError
    ]
  )
  const handleChange = e => {
    const { name, value } = e.target
    errors[name] && setErrors({ ...errors, [name]: '' })
    setUserInfo({ ...userInfo, [name]: value })
  }

  const order = async orderData => {
    await DB.post('/orders', orderData)
  }
  const orderMenu = e => {
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


    const userBought = {
      timeOrder:moment().format('DD MM YYYY hh:mm:ss'),
      deliveryTime: moment().add(30, 'm').format('DD MM YYYY hh:mm:ss'),
      user: updatedUser,
      cart,
      gift,
      address,
      totalItems,
      totalAmount
    }
    order(userBought)
    dispatch(clearOrder())
    setIsModalVisible(true)
  }

  return (
    <>
      {isModalVisible ? (
        <Portal
          component={Modal}
          nameOfClass='success-modal-js'
          modalVisibility={setIsModalVisible}
        />
      ) : (
        <form className='order-form'>
          <div className='order-form__header-container'>
            <h1 className='order-form__info'>{t('orderForm.main')}</h1>
            {orderData.mainInfo.map(
              (
                { name, value, label, error, type, functionError, disabled },
                index
              ) => (
                <Input
                  key={index}
                  name={name}
                  value={value}
                  label={t(label)}
                  error={t(error)}
                  type={type}
                  required={true}
                  onChange={handleChange}
                  handleBlur={functionError}
                  disabled={disabled}
                />
              )
            )}
          </div>
          <div className='order-form__body-container'>
            <h1 className='order-form__info'>{t('orderForm.address')}</h1>
            {orderData.address.map(
              ({ name, value, label, error, type, functionError }, index) => (
                <Input
                  key={index}
                  name={name}
                  value={value}
                  label={t(label)}
                  error={t(error)}
                  required={true}
                  type={type}
                  onChange={handleChange}
                  handleBlur={functionError}
                />
              )
            )}
          </div>
          <div className='order-form__footer-container'>
            <h1 className='order-form__info'>{t('orderForm.payment')}</h1>

            {orderData.payment.map(({ label, name, value }, index) => (
              <div key={index} className='order-form__group'>
                <label className='order-form__label'>{t(label)}</label>
                <input
                  onChange={e =>
                    setUserInfo({
                      ...userInfo,
                      payment: e.target.value
                    })
                  }
                  value={value}
                  type='radio'
                  name={name}
                  id={value}
                  defaultChecked={index === 0 && true}
                />
              </div>
            ))}
          </div>
          <button
            onClick={orderMenu}
            className='order__button'
            disabled={isButtonDisabled}
          >
            {t('orderForm.orderButton')}
          </button>
        </form>
      )}
    </>
  )
}

export default OrderForm
