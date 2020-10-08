import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header.component';
import { useAuth } from '../../providers/Auth';
import { mockedUser } from '../../services/login.api';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

describe('Header logged off', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: false },
      dispatch: jest.fn(),
    }));
  });

  it('has navbar and profile menus', () => {
    render(<Header />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Search...')).toBeVisible();
  });

  it('only show Home link when clicking side menu', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.queryByRole('link')).toBe(null);
    fireEvent.click(screen.getByTestId('side-menu-btn'));
    const navBarLink = screen.getByRole('link');
    expect(navBarLink).toBeVisible();
    expect(navBarLink).toHaveTextContent('Home');
  });

  it('when clicking avatar display sign in', () => {
    render(<Header />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByTestId('profile-menu-btn'));
    expect(screen.getByRole('menuitem')).toHaveTextContent('Sign In');
  });
});

describe('Header logged in', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true, token: mockedUser },
      dispatch: jest.fn(),
    }));
  });

  it('has navbar and profile menus', () => {
    render(<Header />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Search...')).toBeVisible();
  });

  it('show Home and My Favorites link when clicking side menu', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.queryByRole('link')).toBe(null);
    fireEvent.click(screen.getByTestId('side-menu-btn'));
    const navBarLinks = screen.getAllByRole('link');
    expect(navBarLinks).toHaveLength(2);
    expect(navBarLinks[0]).toHaveTextContent('Home');
    expect(navBarLinks[1]).toHaveTextContent('My Favorites');
  });

  it('when clicking avatar display sign out', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByAltText('avatar')).toHaveAttribute('src', mockedUser.avatarUrl);
    fireEvent.click(screen.getByTestId('profile-menu-btn'));
    expect(screen.getByRole('menuitem')).toHaveTextContent('Sign Out');
  });

  it('when clicking signout it closes the menu', () => {
    render(<Header />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByTestId('profile-menu-btn'));
    expect(screen.getByRole('menuitem')).toHaveTextContent('Sign Out');
    fireEvent.click(screen.getByRole('menuitem'));
    expect(screen.queryByRole('menuitem')).toBeNull();
  });
});
