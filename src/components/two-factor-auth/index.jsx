import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { DynamicInputs } from '../index'

import {
  createUser,
  twoFactorAuthError,
  twoFactorAuthToggle
} from '../../redux/auth/actionCreator'

import { modifiedEmail } from '../../utils'

import { DELETE } from '../../constants/variables'

import './index.scss'

const TwoFactorAuth = ({ userCredentials }) => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [values, setValues] = useState(Array(6).fill(''))
  const { generatedPassword, twoFactorAuthInvalid } = useSelector(
    state => state.auth
  )
  let inputRefs = []

  const handleChange = ({ target: { name, value, maxLength } }, idx) => {
    const isInteger = Number.isSafeInteger(Number.parseInt(value))

    if (isInteger && value.length === 1) {
      if (value.length === 1) {
        if (idx < 5) {
          inputRefs[idx + 1].focus()
        }
      }
      let newArr = [...values]
      newArr[name] = value
      setValues(newArr)
    } else if (value.length > 1 && isInteger) {
      setValues(values.map((n, i) => value[i]))
    }
  }

  const handleDelete = ({ key, target: { name } }, idx) => {
    if (key === DELETE) {
      let newArr = [...values]
      newArr[name] = ''
      setValues(newArr)
      if (idx > 0) inputRefs[idx - 1].focus()
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log('values', values)
    const parsetIntValue = Number.parseInt(values.join(''))
    console.log('newValue', parsetIntValue)
    console.log('generated', generatedPassword)
    if (generatedPassword === parsetIntValue) {
      const updatedUser = {
        ...userCredentials,
        password: window.btoa(userCredentials.password)
      }
      dispatch(twoFactorAuthToggle())
      dispatch(createUser(updatedUser, location, history))
    } else {
      dispatch(twoFactorAuthError())
    }
  }

  const isArrayEmpty = values.indexOf('') === -1
  const hiddenEmail = modifiedEmail(userCredentials.email)

  return (
    <div className="twoFactorAuth">
      {twoFactorAuthInvalid ? (
        <h1 className="twoFactorAuth__error">{t('twoFactorAuth.error')}</h1>
      ) : null}
      <h1 className="twoFactorAuth__label">{t('twoFactorAuth.label')}</h1>
      <i className="fas fa-lock twoFactorAuth__icon" />
      <h3 className="twoFactorAuth__text-info">
        {t('twoFactorAuth.textInfo')}
      </h3>
      <h2 className="twoFactorAuth__phone">{hiddenEmail}</h2>
      <form className="twoFactorAuth__form" onSubmit={onSubmit}>
        <div className="twoFactorAuth__inputs">
          <DynamicInputs
            handleChange={(e, idx) => handleChange(e, idx)}
            handleDelete={(e, idx) => handleDelete(e, idx)}
            inputRefs={inputRefs}
            values={values}
          />
        </div>
        <button disabled={!isArrayEmpty} className="twoFactorAuth__send-button">
          {t('twoFactorAuth.send')}
        </button>
      </form>
      <h3 className="twoFactorAuth__question">{t('twoFactorAuth.question')}</h3>
      <button className="twoFactorAuth__resend-button">
        {t('twoFactorAuth.resend')}
      </button>
    </div>
  )
}

export default TwoFactorAuth

TwoFactorAuth.propTypes = {
  userCredentials: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
}
