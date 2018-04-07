const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
       return { ...state, articles: action.payload }
      // return action.articles
    case 'SET_ARTICLE':
      return { ...state, article: action.payload }
    case 'SET_USER_ARTICLES':
      return { ...state, articles: action.payload }
    case 'ADD_ARTICLE':
      return [
        ...state,
        action.article
      ]
    case 'EDIT_ARTICLE':
      return state.articles.map((article) => {
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
      const res = state.articles.filter(article => article._id !== action._id)
      return {...state, articles: res}
    case 'SET_SEARCH':
      return {...state, searchResult: action.payload}
    case 'SEARCH_FAIL':
      return { ...state, error: action.payload }
    case 'CLEAR_SEARCH':
      return { ...state, searchResult: null }
    case 'SUCCESS_MESSAGE':
      return { ...state, success: action.payload }
    case 'CLEAR_FLASH_MESSAGE':
      return { ...state, success: null  }
    default:
      return state;
  }
};

export default articlesReducer;
