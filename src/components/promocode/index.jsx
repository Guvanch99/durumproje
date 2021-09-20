import {Component} from 'react'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'

import {PromoCodeGift, Spinner, Quote} from '..'

import {getPresentPromo} from '../../redux/cart/actionCreators'

import {randomId, upperCaseString} from '../../utils'

import {apiCall} from '../../services'

import { promoCodeMap} from '../../data'


import {DONALD_THRUMP_API} from '../../constants/api'

import './index.scss'



class PromoCode extends Component {
    state = {
        promoCode: '',
        error: false,
        isPromoUsed: false,
        randomQuote: '',
        promoCodeCopy: ''
    }

    randomProduct = (beginProduct, endProduct, promoCode) => {
        let idProduct = randomId(beginProduct, endProduct)
        this.props.getFreeMeal(idProduct, promoCode)
        this.setState({promoCode: '', error: false})
    }

    promoCodeSubmit = e => {
        e.preventDefault()
        const {promoCode} = this.state
        this.setState({error: false})
        let promoCodeUppercase = upperCaseString(promoCode)

        if (this.props.restrictedPromoCodes.includes(promoCodeUppercase)) {
            this.setState({
                promoCodeCopy: promoCodeUppercase,
                isPromoUsed: true,
                error: true,
                promoCode: ''
            })
        } else
            promoCodeMap[promoCodeUppercase] ?
                this.randomProduct(promoCodeMap[promoCodeUppercase].productsBegin, promoCodeMap[promoCodeUppercase].productsEnd, promoCodeMap[promoCodeUppercase]) :
                this.setState({error: true, promoCode: ''})

    }

    async componentDidMount() {
        const {value} = await apiCall(DONALD_THRUMP_API)
        this.setState({randomQuote: value})
    }

    handleChange = ({target}) =>
        this.setState({isPromoUsed: false, promoCode: target.value})

    render() {
        const {
            promoCode,
            error,
            randomQuote,
            isPromoUsed,
            promoCodeCopy
        } = this.state
        const {gift, t} = this.props

        return (
            <>
                {randomQuote ? <Quote randomQuote={randomQuote}/> : <Spinner/>}
                {isPromoUsed ? (
                    <h1 className="promo-used">
                        {t('promoCode.usedPromoCode', {promoCode: promoCodeCopy})}
                    </h1>
                ) : null}
                <div className="promoCode">
                    <form className="promoCode-form" onSubmit={this.promoCodeSubmit}>
                        <label className="promoCode-form__label">
                            {t('promoCode.label')}
                        </label>

                        <input
                            value={promoCode}
                            onChange={this.handleChange}
                            className="promoCode-form__input"
                            type="text"
                            placeholder={
                                error
                                    ? t('promoCode.placeholderError')
                                    : t('promoCode.placeholderDefault')
                            }
                        />

                        <button
                            disabled={gift.length > 0}
                            className="promoCode-form__submit"
                        >
                            {gift.length > 0
                                ? t('promoCode.buttonDisabled')
                                : t('promoCode.buttonSubmit')}
                        </button>
                    </form>
                    {gift.length > 0 ? <PromoCodeGift present={gift}/> : <Spinner/>}
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getFreeMeal: (id, promo) => dispatch(getPresentPromo(id, promo))
})

const mapStateToProps = ({
                             cart: {gift, restrictedPromoCodes},
                             auth: {user}
                         }) => ({
    gift,
    restrictedPromoCodes,
    user
})

export default withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(PromoCode)
)
