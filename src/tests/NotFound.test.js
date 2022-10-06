import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Component <NotFound.js /> tests', () => {
  test('renders a not found message', () => {
    render(<NotFound />);

    const notFoundMessage = screen.getByText(/Page requested not found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('should renders an image', () => {
    render(<NotFound />);

    const notFoundImage = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(notFoundImage).toBeInTheDocument();
  });

  test('should have not found image must specific link', () => {
    render(<NotFound />);

    const notFoundImage = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImage.src).toBe(url);
  });
});
