import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'

import { ArticleName, Input, TwoFactorAuth } from '../../../components'

import { twoFactorAuth } from '../../../redux/auth/actionCreator'

import { EMAIL_VALIDATION } from '../../../constants/regexes'

import '../index.scss'

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    id: uuidv4(),
    userName: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: ''
  })
  const { userName, email, password } = userCredentials

  const { userExist, isTwoFactorAuth } = useSelector(state => state.auth)
  const { t } = useTranslation('translation')

  const dispatch = useDispatch()

  const isButtonDisabled =
    !userName ||
    !email ||
    !password ||
    errors.userName ||
    errors.email ||
    errors.password

  const userNameValidation = () => {
    userName.length <= 4 &&
      setErrors({
        ...errors,
        userName: 'userNameError'
      })
  }
  const emailValidation = () => {
    EMAIL_VALIDATION.test(email) === false &&
      setErrors({
        ...errors,
        email: 'emailError'
      })
  }
  const passwordValidation = () => {
    password.length <= 6 &&
      setErrors({
        ...errors,
        password: 'passwordError'
      })
  }
  /* eslint-disable */
  const CREDENTIALS_DATA = useMemo(
    () => [
      {
        name: 'userName',
        value: userName,
        label: 'registration.labelUser',
        error: errors.userName,
        type: 'text',
        functionError: userNameValidation
      },
      {
        name: 'email',
        value: email,
        label: 'registration.email',
        error: errors.email,
        type: 'email',
        functionError: emailValidation
      },
      {
        name: 'password',
        value: password,
        label: 'registration.password',
        error: errors.password,
        type: 'password',
        functionError: passwordValidation
      }
    ],
    [userName, email, password, errors.userName, errors.email, errors.password]
  )

  const handleChange = e => {
    const { name, value } = e.target
    errors[name] && setErrors({ ...errors, [name]: '' })
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const register = e => {
    e.preventDefault()
    dispatch(twoFactorAuth(userCredentials))
  }

  return (
    <>
      {isTwoFactorAuth ? (
        <TwoFactorAuth userCredentials={userCredentials} />
      ) : (
        <div className="auth">
          <ArticleName name={t('articleNames.signUp')} />
          {userExist ? (
            <h1 className="auth__error">{t('registration.registered')}</h1>
          ) : null}
          <form className="form">
            {CREDENTIALS_DATA.map(
              ({ name, value, label, error, type, functionError }, index) => (
                <Input
                  key={index}
                  name={name}
                  value={value}
                  label={t(label)}
                  error={t(error)}
                  type={type}
                  onChange={handleChange}
                  required={true}
                  handleBlur={functionError}
                />
              )
            )}
            <button
              type="submit"
              onClick={register}
              className="form__button"
              disabled={isButtonDisabled}
            >
              {t('registration.button')}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Register
