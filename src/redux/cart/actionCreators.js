import {DB} from '../../core/axios'

import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_PRODUCT,
    TOGGLE_CART_PRODUCT_AMOUNT,
    GET_PRESENT,
    CLEAR_ORDER,
    PROMO_CODE_USED,
    UPDATE_RESTRICTED_PROMO_CODE,
    UPDATE_GIFT
} from './type'

export const addToCart = payload => ({
    type: ADD_TO_CART,
    payload
})
export const removeProduct = payload => ({
    type: REMOVE_PRODUCT,
    payload
})
export const clearCart = () => ({
    type: CLEAR_CART
})
export const countTotal = () => ({
    type: COUNT_CART_TOTALS
})
export const toggleAmount = payload => ({
    type: TOGGLE_CART_PRODUCT_AMOUNT,
    payload
})

export const clearOrder = () => ({type: CLEAR_ORDER})

export const getPresent = payload => ({
    type: GET_PRESENT,
    payload
})
export const userPromoCodeUsed = payload => ({type: PROMO_CODE_USED, payload})

export const updateGift = payload => ({type: UPDATE_GIFT, payload})

export const updateRestrictedPromoCodes = (payload) => ({type: UPDATE_RESTRICTED_PROMO_CODE, payload})

export const getPresentPromo = (idProduct, promoCode) => async (dispatch, getState) => {
    const {data} = await DB(`/all-products?id=${idProduct}`)
    const {auth: {user}, cart: {restrictedPromoCodes}} = getState()
    const {id, name, src, description, type} = data[0]
    const payload = {
        id,
        name,
        src,
        amount: 1,
        price: 0,
        description,
        type,
        promoCode
    }
    dispatch(getPresent(payload))
    dispatch(userPromoCodeUsed(promoCode))
    dispatch(countTotal())
    const promoCodes = [
        ...restrictedPromoCodes,
        promoCode
    ]
  user !==null&&  await DB.patch(
        `/users/${user.id}`, {restrictedPromoCodes: promoCodes}
    )

}
export const order = async orderData => {
    await DB.post('/orders', orderData)
}