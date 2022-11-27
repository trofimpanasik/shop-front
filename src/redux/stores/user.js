const defaultState = {
  isAuth: false,
  email: '',
  userId: '',
  firstName: '',
  secondName: '',
  birthday: '',
  avatar: '',
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload.user,
        isAuth: action.payload.isAuth
      }
    default:
      return state;
  }
}

export default user;