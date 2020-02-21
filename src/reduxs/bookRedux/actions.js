export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_SUCCESSED = 'FETCH_BOOKS_SUCCESSED';

export const FETCH_CMS_HOME = 'FETCH_CMS_HOME';
export const FETCH_CMS_HOME_SUCCESSED = 'FETCH_CMS_HOME_SUCCESSED';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESSED = 'ADD_TO_CART_SUCCESSED';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';
export const COMPLETED_ADD_TO_CART = 'COMPLETED_ADD_TO_CART';



export const fetchBooks = () => {
  return { type: FETCH_BOOKS };
};

export const fetchCmsHome = () => {
  return { type: FETCH_CMS_HOME };
};

export const addToCart = (data) => {
  return { type: ADD_TO_CART, payload: data };
};

export const addToCartSuccessed = (data) => {
  return { type: ADD_TO_CART_SUCCESSED, payload: data };
};

export const completedAddToCart = () => {
  return { type: COMPLETED_ADD_TO_CART };
};

export const addToCartFailed = (data) => {
  return { type: ADD_TO_CART_FAILED, payload: data };
};
