import * as type from './actions';

var initialState = {
  books: [],
  booksHome: [],
  relatedBooks: [],
  loading: false,
  cart: [],
  error: '',
  addedToCart: false
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_BOOKS:
      return Object.assign({}, state, { loading: true });
    case type.FETCH_CMS_HOME:
      return Object.assign({}, state, { loading: true });
    case type.FETCH_CMS_HOME_SUCCESSED:
      const { booksHome, bestUsers, bestReviewers } = action.payload;
      return Object.assign({}, state, {
        loading: false,
        booksHome,
        bestUsers,
        bestReviewers: bestReviewers.Reviewers
      });
    case type.FETCH_BOOKS_SUCCESSED:
      return Object.assign({}, state, { loading: false, books: action.payload });
    default:
      return state;
  }
};
