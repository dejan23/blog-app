const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_IS_LOADING':
      return { ...state, userIsLoading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_USERS':
      return { ...state, users: action.payload }
    case 'SET_USER_UPDATE':
    return { ...state, user: action.payload }

      // return state.users.users.map((user) => {
      //   if(user._id === action.payload._id) {
      //     return {
      //       ...user,
      //       ...action.payload
      //     }
      //   } else {
      //     return user
      //   }
      // })
    default:
      return state;
  }
};

export default userReducer;
