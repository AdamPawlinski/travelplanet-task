import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders h1 text', () => {
  render(<App />);
  const headerElement = screen.getByText(/Travelplanet finds the best room for you/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders button component', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Book the room/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders select component', () => {
  render(<App />);
  const selectElement = screen.getByLabelText(/Choose the available room:/i);
  expect(selectElement).toBeInTheDocument();
});

test('displays the alert after button click', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  render(<App />);
  fireEvent.click(screen.getByText(/Book the room/i));
  expect(alertMock).toHaveBeenCalledTimes(1);
});

