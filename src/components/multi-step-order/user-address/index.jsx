import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { Input } from '../../index'

import '../index.scss'

const UserAddress = ({
                       nextStep,
                       prevStep,
                       handleChange,
                       storeyValidation,
                       streetValidation,
                       houseValidation,
                       entranceValidation,
                       values,
                       errors
                     }) => {
  const { t } = useTranslation('translation')

  const { street, house, entrance, storey } = values

  const userAddress = useMemo(() => ([
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
    ]),
    [
      street,
      house,
      entrance,
      storey,
      errors.street,
      errors.house,
      errors.entrance,
      errors.storey
    ]
  )

  const isButtonDisabled =
    !street ||
    !house ||
    !entrance ||
    !storey ||
    errors.street ||
    errors.house ||
    errors.entrance ||
    errors.storey

  const onPrevHandler = (e) => {
    e.preventDefault()
    prevStep()
  }

  const onNextHandler = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className='order-container'>
      <h1 className='order-form__text'>{t('orderForm.address')}</h1>
      <form className='order-form'>
        {userAddress.map(
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
        <div className='button-container'>
          <button className='order-form__button' onClick={onPrevHandler}>
            <i className='order-form__icon fas fa-arrow-left' />
          </button>
          <button className='order-form__button' onClick={onNextHandler} disabled={isButtonDisabled}>
            <i className='order-form__icon fas fa-arrow-right' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAddress

UserAddress.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  storeyValidation: PropTypes.func.isRequired,
  streetValidation: PropTypes.func.isRequired,
  houseValidation: PropTypes.func.isRequired,
  entranceValidation: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}
