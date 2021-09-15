import {
    SET_USER,
    LOGIN_USER,
    USER_NOT_FOUND,
    LOGOUT,
    USER_EXIST, MODAL_ERROR_TOGGLE, TWO_FACTOR_AUTH_TOGGLE
} from './type'
import {DB} from '../../core/axios'
import {ROUTER_HOME} from '../../constants/routers'
import {
    updateRestrictedPromoCodes,
    updateGift,
    countTotal,
} from '../cart/actionCreators'

export const signUp = payload => ({
    type: SET_USER,
    payload
})
export const login = payload => ({
    type: LOGIN_USER,
    payload
})
export const isUserExist = () => ({
    type: USER_EXIST
})

export const logOut = () => ({
    type: LOGOUT
})
export const modalPromoErrorToggle = () => ({type: MODAL_ERROR_TOGGLE})

export const userNotFound = () => ({type: USER_NOT_FOUND})

export const twoFactorAuthToggle=()=>({type:TWO_FACTOR_AUTH_TOGGLE})

export const createUser = (user, location, history) => async (dispatch, getState) => {
    const {data: searchedUser} = await DB(
        `/users?userName=${user.userName}&email=${user.email}`
    )
    if (searchedUser.length) {
        dispatch(isUserExist())
    } else {
        const {cart: {restrictedPromoCodes}} = getState()
        const {data} = await DB.post('/users', {...user, restrictedPromoCodes})
        dispatch(signUp(data))
        dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes))
        location.state !== null && location.state.from === '/login'
            ? history.push(ROUTER_HOME)
            : history.goBack()
    }
}

export const loginUser=(userName,password,location,history)=>async (dispatch,getState)=>{
    const {data: users} = await DB(
      `/users?userName=${userName}&password=${password}`
    )
    const {cart: {gift, restrictedPromoCodes: promoCodes}} = getState()
    let intersectionPromoCode = promoCodes.filter(element => users[0].restrictedPromoCodes.includes(element));

    const id = users[0].id
    const restrictedPromoCodes = [
        ...users[0].restrictedPromoCodes,
        ...promoCodes
    ]

    const uniquePromoCodes = [...new Set(restrictedPromoCodes)]
    const {data} = await DB.patch(
      `/users/${id}`, {restrictedPromoCodes: uniquePromoCodes})

    let updatedGift = gift.filter(x => !users[0].restrictedPromoCodes.includes(x.promoCode))

    dispatch(updateGift(updatedGift))
    dispatch(countTotal())
    dispatch(twoFactorAuthToggle())
    intersectionPromoCode.length > 0 && dispatch(modalPromoErrorToggle())
    dispatch(login(data))
    dispatch(updateRestrictedPromoCodes(data.restrictedPromoCodes)
    )

  if (intersectionPromoCode.length === 0) {
         location.state !== null && location.state.from === '/sign-up'
             ? history.push(ROUTER_HOME)
             : history.goBack()
     }
}

export const twoFactorAuth =
    (userName, password) => async (dispatch) => {
        const {data: users} = await DB(
            `/users?userName=${userName}&password=${password}`
        )
        if (users.length > 0) {
            dispatch(twoFactorAuthToggle())

        } else {
            dispatch(userNotFound())
        }
    }
