import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
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

describe('Component <Pokemon /> tests', () => {
  test('should renders Pokémon name on success', () => {
    // renderizar o componente <Pokemon /> na tela
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    // capturar o nome do Pokémon
    const pokemonName = mockedPokemons[0].name;
    const pokemonNameEl = screen.getByText(pokemonName);
    // fazer a asserção que o nome do Pokémon está na tela
    expect(pokemonNameEl).toBeInTheDocument();
  });

  test('should renders Pokémon type on success', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const pokemonType = mockedPokemons[0].type;
    const pokemonTypeEl = screen.getByText(pokemonType);
    expect(pokemonTypeEl).toBeInTheDocument();
  });

  test('should renders Pokémon weight on success', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const pokemonWeight = mockedPokemons[0].averageWeight.value;
    const pokemonWeightUnit = mockedPokemons[0].averageWeight.measurementUnit;
    const pokemonWeightEl = screen.getByText(
      `Average weight: ${pokemonWeight} ${pokemonWeightUnit}`,
    );
    expect(pokemonWeightEl).toBeInTheDocument();
  });

  test('should renders Pokémon image', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const pokemonImageEl = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImageEl).toBeInTheDocument();

    const pokemonImageSrc = mockedPokemons[0].image;
    expect(pokemonImageEl).toHaveAttribute('src', pokemonImageSrc);

    const pokemonImageAlt = `${mockedPokemons[0].name} sprite`;
    expect(pokemonImageEl).toHaveAttribute('alt', pokemonImageAlt);
  });

  test('should renders link `More details`', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const moreDetailsLinkEl = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailsLinkEl).toBeInTheDocument();
    expect(moreDetailsLinkEl).toHaveAttribute(
      'href',
      `/pokemons/${mockedPokemons[0].id}`,
    );
  });

  test('should redirect to Pokemon details page on success', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const moreDetailsLinkEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLinkEl);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockedPokemons[0].id}`);

    const pokemonNameEl = screen.getByText(mockedPokemons[0].name);
    expect(pokemonNameEl).toBeInTheDocument();
  });

  test('should render star image on favorite pokemon', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPokemons[0] } isFavorite={ mockedPokemons[0].id } />,
    );
    const starImageEl = screen.getByRole(
      'img',
      { name: /pikachu is marked as favorite/i },
    );
    expect(starImageEl).toBeInTheDocument();
    expect(starImageEl).toHaveAttribute('src', '/star-icon.svg');
  });
});
