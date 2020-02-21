import * as type from './actions';

var initialState = {
  categories: [],
  loading: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_CATEGORY:
      return Object.assign({}, state, {loading: true});
    case type.FETCH_CATEGORY_SUCCESSED:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });
    case type.FETCH_CATEGORY_FAIL:
      return Object.assign({}, state, {loading: true, categories: []});
    default:
      return state;
  }
};
