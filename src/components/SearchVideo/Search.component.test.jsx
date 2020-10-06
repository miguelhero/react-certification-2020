import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchVideo from './Search.component';
import { useSearch } from '../../providers/Search';

jest.mock('../../providers/Search', () => ({
  useSearch: jest.fn(),
}));

describe('Search component', () => {
  it('should hold the value entered on change', () => {
    const mockedFunction = jest.fn();
    useSearch.mockImplementation(() => ['', mockedFunction]);
    render(<SearchVideo />, { wrapper: MemoryRouter });
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'cool videos' } });
    expect(searchInput.value).toBe('cool videos');
  });

  it('should call search context on submit', () => {
    const mockedFunction = jest.fn();
    useSearch.mockImplementation(() => ['', mockedFunction]);
    render(<SearchVideo />, { wrapper: MemoryRouter });
    const searchInput = screen.getByRole('textbox');
    fireEvent.submit(searchInput, { target: { value: 'cool videos' } });
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
