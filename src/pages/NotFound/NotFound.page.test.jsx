import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFound.page';

describe('Not found page', () => {
  it('has image and link to home', () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole('img')).toHaveAttribute('src', '404.gif');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
