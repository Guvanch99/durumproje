import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import PropTypes from 'prop-types'

import { ROUTER_HOME } from '../../constants/routers'

import './index.scss'

const Modal = ({ modalVisibility }) => {
  const history = useHistory()
  const { t } = useTranslation('translation')
  const closeModal = () => {
    modalVisibility(true)
    history.push(ROUTER_HOME)
  }
let timeDelivery=moment().add(30, 'm').format('hh:mm').toString()
  return (
    <div className="modal-wrapper">
      <div className="modal" onClick={closeModal}>
        <h1 className="modal__label">{t('modal')}</h1>
        <i className="far fa-check-circle modal__success-icon" />
        <h2 className='modal__time'>{t('deliveryTime',{timeDelivery})}</h2>
        <h3 className='modal__delivery-text'>{t('lateDelivery')}</h3>
        <button onClick={closeModal} className="modal__button">
          {t('close')}
        </button>
      </div>
      <div className="app-overlay" />
    </div>
  )
}

Modal.propTypes = {
  modalVisibility: PropTypes.func.isRequired
}

export default memo(Modal)
