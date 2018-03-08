const articlesReducerDefaultState = [];

const articlesReducer = (state = articlesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return action.articles;
    case 'SET_ARTICLE':
      return action.article;
    case 'ADD_ARTICLE':
      return [
        ...state,
        action.article
      ]
    case 'EDIT_ARTICLE':
      return state.map((article) => {
        if(article._id === action.updatedArticle._id) {
          return {
            ...article,
            ...action.updatedArticle
          }
        } else {
          return article
        }
      })
    case 'REMOVE_ARTICLE':
      return state.filter(({ _id }) => _id !== action._id)
    default:
      return state;
  }
};

export default articlesReducer;
