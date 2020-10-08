import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from './Login.page';
import { useAuth } from '../../providers/Auth';
import loginApi from '../../services/login.api';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../services/login.api');

describe('Login page', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: false },
      dispatch: jest.fn(),
    }));
  });

  it('shows the username on type', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' },
    });
    expect(screen.getByRole('textbox').value).toBe('test');
  });

  it('shows the password on type', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'passwd' },
    });
    expect(screen.getByTestId('password-input').value).toBe('passwd');
  });

  it('when submit the loginapi is called', async () => {
    loginApi.mockResolvedValueOnce({ token: jest.fn() });
    render(<LoginPage />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Login'));
    expect(loginApi).toHaveBeenCalled();
  });

  it('when submit the loginapi is wrong', async () => {
    loginApi.mockResolvedValueOnce(Promise.reject(new Error('invalid')));
    render(<LoginPage />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Login'));
    expect(loginApi).toHaveBeenCalled();
  });
});
