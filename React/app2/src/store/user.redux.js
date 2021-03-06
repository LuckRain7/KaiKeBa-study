// user

// 初始化值
const initial = {
  isLogin: false,
  loading: false
}

// state
export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case 'requestLogin':
      return {
        isLogin: false,
        loading: true
      }
    case 'login':
      return {
        isLogin: true,
        loading: false
      }
    default:
      return state
  }
}

// action

export const asyncLogin = () => dispatch => {
  dispatch({ type: 'requestLogin' })
  // 做异步操作
  setTimeout(() => {
    dispatch({ type: 'login' })
  }, 2000)
}
