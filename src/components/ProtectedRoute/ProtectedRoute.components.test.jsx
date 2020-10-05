import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAuth } from '../../providers/Auth';
import ProtectedRoute from './ProtectedRoute.component';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

it('not authenticated user should redirect to login page', () => {
  useAuth.mockImplementation(() => ({
    state: { isAuthenticated: false },
    dispatch: jest.fn(),
  }));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ProtectedRoute>
        <div>protected page!</div>
      </ProtectedRoute>
    </Router>
  );
  expect(screen.queryByText('protected page!')).toBe(null);
  expect(history.location.pathname).toBe('/login');
});

it('when authenticated user should go to same page', () => {
  useAuth.mockImplementation(() => ({
    state: { isAuthenticated: true },
    dispatch: jest.fn(),
  }));
  render(
    <ProtectedRoute>
      <div>protected page!</div>
    </ProtectedRoute>,
    { wrapper: MemoryRouter }
  );
  expect(screen.getByText('protected page!')).toHaveTextContent('protected page!');
});
