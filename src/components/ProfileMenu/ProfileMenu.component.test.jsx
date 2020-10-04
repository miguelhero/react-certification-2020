import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProfileMenu from './ProfileMenu.component';
import { useAuth } from '../../providers/Auth';
import { mockedUser } from '../../services/login.api';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Profile component logged off', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: false },
      dispatch: jest.fn(),
    }));
  });

  it('shows sing in when logged off', () => {
    render(<ProfileMenu />);
    expect(screen.getByRole('menuitem', { hidden: true })).toHaveTextContent('Sign In');
  });

  it('go to login page when at sign in', () => {
    render(<ProfileMenu />);
    fireEvent.click(screen.getByRole('menuitem', { hidden: true }));
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});

describe('Profile component logged in', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true, token: mockedUser },
      dispatch: jest.fn(),
    }));
  });

  it('shows sing out when logged in', () => {
    render(<ProfileMenu />);
    expect(screen.getByRole('menuitem', { hidden: true })).toHaveTextContent('Sign Out');
  });

  it('go to homepage after signing out', () => {
    render(<ProfileMenu />);
    fireEvent.click(screen.getByRole('menuitem', { hidden: true }));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
