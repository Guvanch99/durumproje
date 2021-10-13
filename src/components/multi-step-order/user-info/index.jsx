import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { Input } from '../..'

import '../index.scss'

const UserInfo = ({ nextStep, handleChange, phoneValidation, errors, values }) => {
  const { t } = useTranslation('translation')
  const { userName, email, phone } = values

  const userInfo = useMemo(() => ([
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
  ]), [
    userName,
    email,
    phone, errors.userName,
    errors.email,
    errors.phone
  ])

  const isButtonDisabled =
    !userName ||
    !email ||
    !phone ||
    errors.userName ||
    errors.email ||
    errors.phone

  const onNextHandler = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className='order-container'>
      <h1 className='order-form__text'>{t('orderForm.main')}</h1>
      <form className='order-form'>
        {
          userInfo.map(({
                          name,
                          value,
                          label,
                          error, type,
                          functionError,
                          disabled
                        },
                        idx) => (
            <Input
              key={idx}
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
          ))
        }
        <button className='order-form__button' onClick={onNextHandler} disabled={isButtonDisabled}>
          <i className='order-form__icon fas fa-arrow-right' />
        </button>
      </form>
    </div>
  )
}

export default UserInfo

UserInfo.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  phoneValidation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
