import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
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
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
];

describe('Component <PokemonDetails.js /> tests', () => {
  test('should renders pokemons details', () => {
    const [firstPokemon] = mockedPokemons;
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${firstPokemon.id}`);

    const pokemonName = screen.getByRole('heading', {
      name: `${firstPokemon.name} Details`,
    });
    expect(pokemonName).toBeInTheDocument();

    const pokemonDetailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetailsLink).toBeNull();

    const pokemonDetailsSummary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(pokemonDetailsSummary).toBeInTheDocument();

    const text = 'this intelligent pokémon roasts hard berries with electricity';
    const pokemonDetailsSummaryText = screen.getByText(new RegExp(text, 'i'));
    expect(pokemonDetailsSummaryText).toBeInTheDocument();
  });

  test('should renders pokemons section maps', () => {
    const [firstPokemon] = mockedPokemons;
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${firstPokemon.id}`);

    const pokemonDetailsSectionMaps = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(pokemonDetailsSectionMaps).toBeInTheDocument();
  });

  test('should renders pokemons section maps images', () => {
    const [firstPokemon] = mockedPokemons;
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${firstPokemon.id}`);

    const pokemonDetailsSectionMapsImageLocations = screen
      .getAllByAltText(/pikachu location/i);
    expect(pokemonDetailsSectionMapsImageLocations.length).toBe(2);

    expect(pokemonDetailsSectionMapsImageLocations[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(pokemonDetailsSectionMapsImageLocations[0]).toHaveAttribute(
      'alt',
      'Pikachu location',
    );
    expect(pokemonDetailsSectionMapsImageLocations[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(pokemonDetailsSectionMapsImageLocations[1]).toHaveAttribute(
      'alt',
      'Pikachu location',
    );
  });

  test('should user favorite a pokemon on success', () => {
    const [firstPokemon] = mockedPokemons;
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${firstPokemon.id}`);

    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).not.toBeChecked();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
  });
});
