import {
  SET_USER,
  LOGOUT,
  USER_EXIST,
  USER_NOT_FOUND,
  LOGIN_USER,
  MODAL_ERROR_TOGGLE,
  TWO_FACTOR_AUTH_TOGGLE,
  GET_GENERATED_PASSWORD,
  TWO_FACTOR_AUTH_ERROR
} from './type'

const initialState = {
  user: null,
  userExist: false,
  userNotFound: false,
  isModalPromoError: false,
  isTwoFactorAuth: false,
  generatedPassword: null,
  twoFactorAuthInvalid: false
}

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload, userExist: false }
    case USER_EXIST:
      return { ...state, userExist: true }
    case USER_NOT_FOUND:
      return { ...state, userNotFound: true }
    case LOGIN_USER: {
      console.log(payload)
      return { ...state, user: payload, userNotFound: false }
    }
    case LOGOUT:
      return { ...state, user: null }
    case MODAL_ERROR_TOGGLE:
      return { ...state, isModalPromoError: !state.isModalPromoError }
    case TWO_FACTOR_AUTH_TOGGLE:
      return { ...state, isTwoFactorAuth: !state.isTwoFactorAuth }
    case GET_GENERATED_PASSWORD:
      return { ...state, generatedPassword: payload }
    case TWO_FACTOR_AUTH_ERROR:
      return { ...state, twoFactorAuthInvalid: true }
    default:
      return state
  }
}
