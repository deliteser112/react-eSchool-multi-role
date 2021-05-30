import ACTIONS from "../actions/";

const initialState = {
  user: [],
  isLogged: false,
  isAdmin: false,
  isProfessor: false,
  isSecretar: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
      case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        isProfessor: action.payload.isProfessor,
        isSecretar: action.payload.isSecretar,
      };

    default:
      return state;
  }
};

export default authReducer;
