import * as Type from "./actions"

const initState = {
  data: {},
  loading: false,
  isAuthenticated: false,
  user: {},
  cart: [],
  idCart: '',
  notifications: []
}


export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case Type.LOGIN:
      return Object.assign({}, state, {
        loading: true
      });
    case Type.LOGIN_SUCCESSED:
      return Object.assign({}, state, {
        logingIn: false,
        isAuthenticated: true,
        user: action.payload.Data,
        token: action.payload.Token.access_token,
        loading: false,
        error: '',
        cart: action.payload.Data.Basket.Items,
        idCart: action.payload.Data.Basket.Id
      });
    case Type.LOGIN_FAILED:
      return Object.assign({}, state, {
        logingIn: false,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      });
    case Type.GET_CART_SUCCESSED:
      return Object.assign({}, state, {
        cart: action.payload
      });
    case Type.REGISTER:
      return Object.assign({}, state, {
        loading: true,
        signingUp: false,
        error: ''
      });
    case Type.REGISTER_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        user: action.payload.Data,
        token: action.payload.Token.access_token,
        error: '',
        cart: action.payload.Data.Basket.Items,
        idCart: action.payload.Data.Basket.Id
      });
    case Type.REGISTER_FAILED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        signingUp: false,
        error: action.payload
      });
    case Type.LOGOUT:
      return Object.assign({}, state, {
        loading: true
      })
    case Type.LOGOUT_SUCCESSED:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: '',
        loading: false,
        user: {},
        error: ''
      })
    case Type.GET_NOTIFICATIONS:
      return Object.assign({}, state, {
        loading: true,
      })
    case Type.GET_NOTIFICATIONS_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        notifications: action.payload
      })
    case Type.UPDATE_PROFILE_SUCCESSED:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.Data,
        loading: false,
        error: '',
      });
    case Type.UPDATE_PROFILE_FAILED:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        error: action.payload
      });
    default: return state
  }
}
