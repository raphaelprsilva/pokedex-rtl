import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
];

describe('Tests <FavoritePokemons.js /> component', () => {
  test('should render `No favorite pokemon found` message', () => {
    renderWithRouter(<FavoritePokemons />);
    const messageElement = screen.getByText(/No favorite pokemon found/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('should render favorites pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    pokemons.forEach((pokemon) => {
      const { name } = pokemon;
      const nameElement = screen.getByText(name);
      expect(nameElement).toBeInTheDocument();
    });
  });
});
