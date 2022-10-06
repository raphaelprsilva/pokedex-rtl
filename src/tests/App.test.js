import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Testa o componente <App.js />', () => {
  test('should render `Home` link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render `About` link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render `Favorite Pokemons` link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/Favorite Pokémons/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render `Pokedex` component', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('should render `About` component', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('should render `Not Found` component', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/not-found');
    });

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
