export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const REGISTER_SUCCESSED = "REGISTER_SUCCESSED"
export const REGISTER_FAILED = "REGISTER_FAILED"

export const LOGIN_SUCCESSED = "LOGIN_SUCCESSED"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESSED = "LOGOUT_SUCCESSED"

export const GET_CART = "GET_CART"
export const GET_CART_SUCCESSED = "GET_CART_SUCCESSED"

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS"
export const GET_NOTIFICATIONS_SUCCESSED = "GET_NOTIFICATIONS_SUCCESSED"


export const LOGOUT = "LOGOUT"

export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const UPDATE_PROFILE_SUCCESSED = "UPDATE_PROFILE_SUCCESSED"
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED"

export const login = (user) => {
  return { type: LOGIN, payload: user }
}

export const register = (user) => {
  return { type: REGISTER, payload: user }
}

export const logout = () => {
  return { type: LOGOUT }
}

export const getCart = data => {
  return ({ type: GET_CART, payload: data });
};

export const getNotifications = data => {
  return ({ type: GET_NOTIFICATIONS, payload: data });
}

export const updateProfile = (user) => {
  return { type: UPDATE_PROFILE, payload: user };
}
