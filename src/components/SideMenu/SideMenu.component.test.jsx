import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
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
    expect(screen.queryByRole('link')).toBeNull();
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
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('shows the drawer when open prop is set to true with Home and My Favorites', () => {
    render(<SideMenu open />, { wrapper: MemoryRouter });
    const navBarLinks = screen.getAllByRole('link');
    expect(navBarLinks).toHaveLength(2);
    expect(navBarLinks[0]).toHaveTextContent('Home');
    expect(navBarLinks[1]).toHaveTextContent('My Favorites');
  });
});

describe('Closing drawer', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true },
      dispatch: jest.fn(),
    }));
  });

  it('when clicking Home', () => {
    const mockSetOpen = jest.fn();
    render(<SideMenu open setOpen={mockSetOpen} />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByRole('link', { name: /home/i }));
    expect(mockSetOpen).toHaveBeenCalled();
  });

  it('when clicking Favorites', () => {
    const mockSetOpen = jest.fn();
    render(<SideMenu open setOpen={mockSetOpen} />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByRole('link', { name: /my favorites/i }));
    expect(mockSetOpen).toHaveBeenCalled();
  });

  it('when clicking outside', () => {
    const mockSetOpen = jest.fn();
    render(<SideMenu open setOpen={mockSetOpen} />, { wrapper: BrowserRouter });
    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Esc', code: 'Esc' });
    expect(mockSetOpen).toHaveBeenCalled();
  });
});
