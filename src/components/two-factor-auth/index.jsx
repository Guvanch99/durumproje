import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import TwoFactorAuthInput from './internal'
import { NUMBER_CHECKER } from '../../constants'

import './index.scss'

const TwoFactorAuth = () => {
  const { t } = useTranslation('translation')
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
  const handleChange = (e) => {
    const { value, name, maxLength } = e.target
    const num = name.match(/\d+/g)
    if (value === '' || NUMBER_CHECKER.test(value)) {
      let fieldIntIndex = parseInt(num, 10)
      if (value.length >= maxLength) {

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
      console.log('fired')
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
  }
  return (
    <div className='twoFactorAuth'>
      <h1 className='twoFactorAuth__label'>{t('twoFactorAuth.label')}</h1>
      <i className='fas fa-lock twoFactorAuth__icon' />
      <h3 className='twoFactorAuth__text-info'>{t('twoFactorAuth.textInfo')} </h3>
      <h2 className='twoFactorAuth__phone'>+375.......52</h2>
      <form className='twoFactorAuth__form' onSubmit={onSubmit}>
        <div className='twoFactorAuth__inputs'>
          {
            INPUT_DATA.map(({ name, value }, index) => (
                <div key={index} className={index===2?'twoFactorAuth__container':''}>
                  <TwoFactorAuthInput  onkeydown={keydownHandler} key={index} handleChange={handleChange} name={name}
                                      value={value} />

                  {index === 2 && <div className='twoFactorAuth__dash'>-</div>}
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
export default TwoFactorAuth