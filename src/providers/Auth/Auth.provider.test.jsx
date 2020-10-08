import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthProvider, { useAuth } from './Auth.provider';
import { storage } from '../../utils/storage';
import { mockedUser } from '../../services/login.api';

jest.mock('../../utils/storage');

const ComponentUsingProvider = () => {
  const { state, dispatch } = useAuth();
  return (
    <>
      <div data-testid="auth">{JSON.stringify(state.isAuthenticated)}</div>
      <div data-testid="token">{JSON.stringify(state.token)}</div>
      {state.favorites &&
        state.favorites.map((fav) => (
          <div key={fav.id} data-testid="favs">
            {JSON.stringify(fav.id)}
          </div>
        ))}
    </>
  );
};

const renderedComponent = () =>
  render(
    <AuthProvider>
      <ComponentUsingProvider />
    </AuthProvider>
  );

describe('AuthProvider', () => {
  it('when has no storage should take default initial values', () => {
    renderedComponent();
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
    expect(screen.getByTestId('token')).toHaveTextContent(null);
    expect(screen.queryByTestId('favs')).toBeNull();
  });

  it('when has storage should take those values', () => {
    const favorites = ['id1', 'id2'];
    storage.get.mockResolvedValue({
      isAuthenticated: true,
      token: mockedUser,
      favorites,
    });
    renderedComponent();
    screen.debug();
    expect(screen.getByTestId('auth')).not.toHaveTextContent('false');
    expect(screen.getByTestId('token')).not.toHaveTextContent(null);
  });
});
