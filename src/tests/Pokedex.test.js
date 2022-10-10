import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';

const mockedPokemons = [
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

describe('Component <Pokedex.js /> tests', () => {
  test('renders a h2 with the text `Encountered pokémons`', () => {
    const [firstPokemon] = mockedPokemons;

    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('renders the next pokemon button', () => {
    const [firstPokemon] = mockedPokemons;

    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    expect(nextPokemonButton).toBeInTheDocument();
  });

  test('next pokemon should render on click at next pokemon button', () => {
    const [firstPokemon] = mockedPokemons;

    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const nextPokemon = getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('should have buttons to filter pokémons by type', () => {
    const [firstPokemon] = mockedPokemons;

    renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );

    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton).toHaveLength(2);
  });

  test('should render only pokémons of the selected type', () => {
    const [firstPokemon] = mockedPokemons;

    renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const firePokemon = screen.getByText(/Charmander/i);
    expect(firePokemon).toBeInTheDocument();
  });

  test('should render all pokémons when `All` button is selected', () => {
    const [firstPokemon] = mockedPokemons;

    renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ firstPokemon }
      />,
    );

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    const allPokemons = screen.getAllByText(/Pikachu|Charmander/i);
    expect(allPokemons.length).toBe(1);
  });
});
