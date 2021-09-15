import { useMemo, useState } from 'react'
import {useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next'
import {useHistory,useLocation} from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import TwoFactorAuthInput from './internal'

import {loginUser} from '../../redux/auth/actionCreator'

import { NUMBER_CHECKER } from '../../constants/regexes'

import './index.scss'


const TwoFactorAuth = ({userName,password}) => {
  const { t } = useTranslation('translation')
  const dispatch=useDispatch()
  const history=useHistory()
  const location=useLocation()
  const [userAuthInput, setUserAuthInput] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  })

  const { input1, input2, input3, input4, input5, input6 } = userAuthInput
  const isButtonDisabled =
    !input1 ||
    !input2 ||
    !input3 ||
    !input4 ||
    !input5 ||
    !input6

  const INPUT_DATA = useMemo(
    () => [
      {
        name: 'input1',
        value: input1
      },
      {
        name: 'input2',
        value: input2
      },
      {
        name: 'input3',
        value: input3
      },
      {
        name: 'input4',
        value: input4
      },
      {
        name: 'input5',
        value: input5
      },
      {
        name: 'input6',
        value: input6
      }
    ],
    [input1, input2, input3, input4, input5, input6]
  )
  const handleChange = ({target}) => {
    const { value, name, maxLength } = target

    const num = name.match(/\d+/g)

    if (value !== '' || NUMBER_CHECKER.test(value)) {
      let fieldIntIndex = parseInt(num, 10)

      if (value.length === maxLength) {

        if (fieldIntIndex < 6) {
          const nextfield = document.querySelector(
            `input[name=input${fieldIntIndex + 1}]`
          )
          if (nextfield !== null) {
            nextfield.focus()
          }
        }
      }
      setUserAuthInput({
        ...userAuthInput,
        [name]: value
      })
    }
  }

  const keydownHandler = (e) => {
    const { name } = e.target
    const num = name.match(/\d+/g)
    if (e.keyCode === 8) {
      let fieldIntIndex = parseInt(num, 10)
      if (fieldIntIndex > 1) {
        const prevfield = document.querySelector(
          `input[name=input${fieldIntIndex - 1}]`
        )
        if (prevfield !== null) {
          prevfield.focus()
        }
      }
      setUserAuthInput({
        ...userAuthInput,
        [name]: ''
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let hashPassword = window.btoa(password)
    dispatch(loginUser(userName,hashPassword,location,history))
  }
//todo 2 and index constant classNames 126
  return (
    <div className='twoFactorAuth'>
      <h1 className='twoFactorAuth__label'>{t('twoFactorAuth.label')}</h1>
      <i className='fas fa-lock twoFactorAuth__icon' />
      <h3 className='twoFactorAuth__text-info'>{t('twoFactorAuth.textInfo')}</h3>
      <h2 className='twoFactorAuth__phone'>+375.......52</h2>
      <form className='twoFactorAuth__form' onSubmit={onSubmit}>
        <div className='twoFactorAuth__inputs'>
          {
            INPUT_DATA.map(({ name, value }, idx) => (
                <div key={idx} className={classNames({'twoFactorAuth__container':idx===2})}>
                  <TwoFactorAuthInput  onkeydown={keydownHandler} key={idx} handleChange={handleChange} name={name}
                                      value={value} />

                  {idx === 2 ? <div className='twoFactorAuth__dash'>-</div>:null}
                </div>
              )
            )
          }
        </div>
        <button disabled={isButtonDisabled} className='twoFactorAuth__send-button'>{t('twoFactorAuth.send')}</button>
      </form>
      <h3 className='twoFactorAuth__question'>{t('twoFactorAuth.question')}</h3>
      <button className='twoFactorAuth__resend-button'>{t('twoFactorAuth.resend')}</button>
    </div>
  )
}

TwoFactorAuth.propTypes={
  userName:PropTypes.string.isRequired,
  password:PropTypes.string.isRequired
}

export default TwoFactorAuth
