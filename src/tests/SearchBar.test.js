import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders an input with the value equal to initial value passed in props', () => {
    render(<SearchBar initialValue="test" />);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('test');
  });

  it('updates the displayed value after typing to the input and a "click" event on the Submit button', async () => {
    const onSearch = jest.fn();
    render(<SearchBar initialValue="test" onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'new value');
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('testnew value');
  });

  it('updates the displayed value after typing to the input and pressing Enter key', async () => {
    const onSearch = jest.fn();
    render(<SearchBar initialValue="test" onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'new value');
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(onSearch).toHaveBeenCalledWith('testnew value');
  });
});
