import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesPage from './Favorites.page';
import { useAuth } from '../../providers/Auth';
import { mockedUser } from '../../services/login.api';
import { favoritesDb } from '../../data/favorites';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

describe('Favorites page with no favorites', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true, token: mockedUser },
      dispatch: jest.fn(),
    }));
  });

  it('when no favorites displays username and No favorites yet in headings', () => {
    render(<FavoritesPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('Wizeline');
    expect(headings[1]).toHaveTextContent('No favorites yet!');
  });
});

describe('Favorites page with favorites', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      state: { isAuthenticated: true, token: mockedUser, favorites: favoritesDb },
      dispatch: jest.fn(),
    }));
  });

  it('when favorites displays username in heading and links to fav videos', () => {
    render(<FavoritesPage />, { wrapper: MemoryRouter });
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('Wizeline');
    expect(headings[1]).toHaveTextContent(favoritesDb[0].snippet.title);
  });
});
