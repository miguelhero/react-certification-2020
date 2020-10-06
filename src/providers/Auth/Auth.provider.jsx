import React, { createContext, useReducer, useContext } from 'react';

import { storage } from '../../utils/storage';
import { favoritesDb } from '../../data/favorites';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

let initialState = {
  isAuthenticated: false,
  token: null,
  favorites: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      storage.set('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      storage.clear();
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
  if (storage.get('token')) {
    initialState = {
      isAuthenticated: true,
      token: storage.get('token'),
      favorites: favoritesDb,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};

export { useAuth };
export default AuthProvider;
