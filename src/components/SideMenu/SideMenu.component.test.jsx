import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideMenu from './SideMenu.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

describe('Profile component logged off', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: false },
      dispatch: jest.fn(),
    }));
  });

  it('is not visible when prop is false', () => {
    render(<SideMenu open={false} />);
    expect(screen.queryByRole('link')).toBe(null);
  });

  it('shows the drawer when open prop is set to true with only Home', () => {
    render(<SideMenu open />, { wrapper: MemoryRouter });
    const navBarLink = screen.getByRole('link');
    expect(navBarLink).toBeVisible();
    expect(navBarLink).toHaveTextContent('Home');
  });
});

describe('Profile component logged in', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true },
      dispatch: jest.fn(),
    }));
  });

  it('is not visible when prop is false', () => {
    render(<SideMenu open={false} />);
    expect(screen.queryByRole('link')).toBe(null);
  });

  it('shows the drawer when open prop is set to true with Home and My Favorites', () => {
    render(<SideMenu open />, { wrapper: MemoryRouter });
    const navBarLinks = screen.getAllByRole('link');
    expect(navBarLinks).toHaveLength(2);
    expect(navBarLinks[0]).toHaveTextContent('Home');
    expect(navBarLinks[1]).toHaveTextContent('My Favorites');
  });
});
