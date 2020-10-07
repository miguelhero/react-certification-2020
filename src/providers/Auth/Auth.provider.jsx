import React, { createContext, useReducer, useContext } from 'react';

import { storage } from '../../utils/storage';

const STATE = 'user';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  isAuthenticated: false,
  token: null,
  favorites: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case 'ADDTOFAV':
      return {
        ...state,
        favorites: state.favorites.concat(action.payload),
      };
    case 'REMOVEFROMFAV':
      return {
        ...state,
        favorites: state.favorites.filter(
          (video) => video.id.videoId !== action.payload.videoId
        ),
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, storage.get(STATE) || initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};

export { useAuth, STATE };
export default AuthProvider;
