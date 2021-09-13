import {
    SET_USER,
    LOGIN_USER,
    USER_NOT_FOUND,
    LOGOUT,
    USER_EXIST, MODAL_ERROR_TOGGLE
} from './type'
import {DB} from '../../core/axios'
import {ROUTER_HOME} from '../../constants'
import {
    updateRestrictedPromoCode,
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


export const createUser = (user, location, history) => async (dispatch, getState) => {
    const {data: searchedUser} = await DB(
        `/users?userName=${user.userName}&email=${user.email}`
    )
    if (searchedUser.length) {
        dispatch(isUserExist())
    } else {
        const {cart: {restrictedPromoCode}} = getState()
        const {data} = await DB.post('/users', {...user, restrictedPromoCode})
        dispatch(signUp(data))
        dispatch(updateRestrictedPromoCode(data.restrictedPromoCode))
        location.state !== null && location.state.from === '/login'
            ? history.push(ROUTER_HOME)
            : history.goBack()
    }
}

export const loginUser =
    (userName, password, location, history) => async (dispatch, getState) => {
        const {data: users} = await DB(
            `/users?userName=${userName}&password=${password}`
        )
        if (users.length > 0) {
            const {cart: {gift, restrictedPromoCode: promoCodes}} = getState()
            let intersectionPromoCode = promoCodes.filter(element => users[0].restrictedPromoCode.includes(element));

            const id = users[0].id
            const restrictedPromoCode = [
                ...users[0].restrictedPromoCode,
                ...promoCodes
            ]

            const uniquePromoCodes = [...new Set(restrictedPromoCode)]
            const {data} = await DB.patch(
                `/users/${id}`, {restrictedPromoCode: uniquePromoCodes})

            let updatedGift = gift.filter(x => !users[0].restrictedPromoCode.includes(x.promocode))

            dispatch(updateGift(updatedGift))
            dispatch(countTotal())
            intersectionPromoCode.length > 0 && dispatch(modalPromoErrorToggle())
            dispatch(login(data))
            dispatch(updateRestrictedPromoCode(data.restrictedPromoCode)
            )


            if (intersectionPromoCode.length === 0) {
                location.state !== null && location.state.from === '/sign-up'
                    ? history.push(ROUTER_HOME)
                    : history.goBack()
            }

        } else {
            dispatch(userNotFound())
        }
    }
