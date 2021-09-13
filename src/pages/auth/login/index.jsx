import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ArticleName, Input, ModalPromoError, Portal } from '../../../components'
import { loginUser } from '../../../redux/auth/actionCreator'

import '../index.scss'

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    userName: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    userName: '',
    password: ''
  })

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { t } = useTranslation('translation')
  const { isModalPromoError,userNotFound} = useSelector(state => state.auth)
  let { userName, password } = userLogin

  const isButtonDisabled =
    !userName || !password || errors.userName || errors.password

  const userNameValidation = () => {
    userName.length <= 4 &&
      setErrors({
        ...errors,
        userName: 'userNameError'
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
  const LOGIN_DATA = useMemo(
    () => [
      {
        name: 'userName',
        value: userName,
        label: 'login.labelUser',
        error: errors.userName,
        type: 'text',
        functionError: userNameValidation
      },
      {
        name: 'password',
        value: password,
        label: 'login.password',
        error: errors.password,
        type: 'password',
        functionError: passwordValidation
      }
    ],
    [userName, password, errors.userName, errors.password]
  )

  const handleChange = event => {
    const { value, name } = event.target
    errors[name] && setErrors({ ...errors, [name]: '' })
    setUserLogin({ ...userLogin, [name]: value })
  }

  const login = event => {
    event.preventDefault()
    const { userName, password } = userLogin
    let hashPassword = window.btoa(password)

    dispatch(loginUser(userName, hashPassword, location, history))
  }

  return (
    <>
    <div className="auth">

      <ArticleName name={t('articleNames.login')} />
        {userNotFound && (
        <h1 className="auth__error">{t('login.userNotFound')}</h1>
      )}
      {isModalPromoError ?(< Portal component={ModalPromoError} nameOfClass='modalPromoError'/>):(
      <form className="form">
        {LOGIN_DATA.map(
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
          onClick={login}
          className="form__button"
          disabled={isButtonDisabled}
        >
          {t('login.button')}
        </button>
      </form>)}
    </div>
    </>
  )
}

export default Login
