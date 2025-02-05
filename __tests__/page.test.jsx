import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/app/page';

describe('Tests du composant Home', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('affiche le titre de la calculatrice', () => {
    const title = screen.getByText(/Calculatrice Fractale Vision/i);
    expect(title).toBeInTheDocument();
  });

  it('affiche le champ de saisie', () => {
    const inputField = screen.getByPlaceholderText('Calcul ici');
    expect(inputField).toBeInTheDocument();
  });

  it('affiche tous les boutons de la calculatrice', () => {
    const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'Clear'];
    buttons.forEach((button) => {
      expect(screen.getByText(button)).toBeInTheDocument();
    });
  });

  it('permet à l’utilisateur de saisir des valeurs', () => {
    const inputField = screen.getByPlaceholderText('Calcul ici');
    fireEvent.change(inputField, { target: { value: '2+2' } });
    expect(inputField.value).toBe('2+2');
  });

  it('calcule le bon résultat lorsque = est pressé', () => {
    const inputField = screen.getByPlaceholderText('Calcul ici');
    fireEvent.change(inputField, { target: { value: '2+3' } });

    fireEvent.click(screen.getByText('='));
    expect(inputField.value).toBe('5');
  });

  it("affiche une erreur lors d'une saisie invalide", () => {
    const inputField = screen.getByPlaceholderText('Calcul ici');
    fireEvent.change(inputField, { target: { value: 'abc' } });

    fireEvent.click(screen.getByText('='));
    expect(inputField.value).toBe('Erreur');
  });

  it('efface lorsque le bouton `Clear` est pressé', () => {
    const inputField = screen.getByPlaceholderText('Calcul ici');
    fireEvent.change(inputField, { target: { value: '10+5' } });

    fireEvent.click(screen.getByText('Clear'));
    expect(inputField.value).toBe('');
  });

  it("ajoute correctement les caractères lors de l'utilisation des boutons", () => {
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));

    const inputField = screen.getByPlaceholderText('Calcul ici');
    expect(inputField.value).toBe('7+3');
  });

  it('gère bien les opérations décimales', () => {
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    const inputField = screen.getByPlaceholderText('Calcul ici');
    expect(inputField.value).toBe('9.5');
  });
});
