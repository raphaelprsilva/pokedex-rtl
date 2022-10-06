import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />', () => {
  test('should render `About Pokédex` heading', () => {
    renderWithRouter(<About />);
    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('should render the first paragraph', () => {
    renderWithRouter(<About />);
    const paragraphElement = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should render the second paragraph', () => {
    renderWithRouter(<About />);
    const paragraphElement = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('should render the Pokédex image', () => {
    renderWithRouter(<About />);

    const imageElement = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imageElement).toHaveAttribute('src', url);
  });
});
