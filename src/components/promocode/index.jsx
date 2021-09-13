import { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import axios from 'axios'

import { PromoCodeGift, Spinner, Quote } from '..'
import { getPresentPromo } from '../../redux/cart/actionCreators'
import { randomId } from '../../utils'

import './index.scss'
import { DONALD_THRUMP_API, HALYAVA_PROMOCODE,DONER_PROMOCODE,BEVERAGE_PROMOCODE} from '../../constants'

class PromoCode extends Component {
  state = {
    promocode: '',
    error: false,
    isPromoUsed:false,
    randomQuote: ''
  }

  promocodeSubmit = e => {
    e.preventDefault()
    this.setState({error:false})
    if(this.props.restrictedPromoCode.includes(this.state.promocode.trim().toUpperCase())){

      this.setState({isPromoUsed:true,error:true,promocode:''})
    }else{
      if (this.state.promocode.trim().toUpperCase() === HALYAVA_PROMOCODE) {
        let id = randomId(1, 17)
        this.props.getFreeMeal(id,HALYAVA_PROMOCODE)
        this.setState( {promocode: '' })
      }
      if(this.state.promocode.trim().toUpperCase() === DONER_PROMOCODE) {
        let id = randomId(4, 9)
        this.props.getFreeMeal(id,DONER_PROMOCODE)
        this.setState({ promocode: '' })
      }
      if(this.state.promocode.trim().toUpperCase() === BEVERAGE_PROMOCODE){
        let id = randomId(10, 17)
        this.props.getFreeMeal(id,BEVERAGE_PROMOCODE)
        this.setState({ promocode: '' })
      }
    }
  }

  async componentDidMount() {
    axios(DONALD_THRUMP_API).then(({ data }) => {
      const { value } = data
      this.setState({ randomQuote: value })
    })
  }

  render() {
    const { promocode, error, randomQuote,isPromoUsed } = this.state
    const {  gift, t, } = this.props

    return (
      <>
        {!randomQuote ? <Spinner /> : <Quote randomQuote={randomQuote} />}
        {isPromoUsed&&<h1 className='promo-used'>{t('promoCode.usedPromoCode',{promocode})}</h1>}
        <div className='promocode'>
          <form className='promocode-form' onSubmit={this.promocodeSubmit}>
            <label className='promocode-form__label'>
              {t('promoCode.label')}
            </label>
            <input
              value={promocode}
              onChange={e => this.setState({isPromoUsed:false, promocode: e.target.value })}
              className='promocode-form__input'
              type='text'
              placeholder={
                error
                  ? t('promoCode.placeholderError')
                  : t('promoCode.placeholderDefault')
              }
            />

            <button className='promocode-form__submit'>
              {t('promoCode.buttonSubmit')}
            </button>
          </form>
          {!gift ? <Spinner /> : <PromoCodeGift present={gift} />}
        </div>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFreeMeal: (id,promo) => dispatch(getPresentPromo(id,promo))
  }
}

function mapStateToProps(state) {
  const { cart: { gift,restrictedPromoCode },auth:{user} } = state
  return { gift,restrictedPromoCode,user}
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PromoCode)
)
