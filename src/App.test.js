import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveStyle({"background-color": "red"});

  //click button
  fireEvent.click(colorButton);
  //expect button to have updated color - blue
  expect(colorButton).toHaveStyle({"background-color": "blue"});
  //expect button to have updated text
  expect(colorButton).toHaveTextContent("Change to red");
});


test('initial conditions', () => {
  render(<App />);

  //check that the button starts with enable = true
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox', { name: "Disable"});
  //expect checbox to be unchecked in initial conditions
  expect(checkbox).not.toBeChecked();

  //click button
  fireEvent.click(checkbox);

  //expect colorButton to be disabled
  expect(colorButton).toBeDisabled();

  //expect checkbox to be checked
  expect(checkbox).toBeChecked();

  //click button
  fireEvent.click(checkbox);

  //expect colorButton to be enabled
  expect(colorButton).toBeEnabled();

  //expect checkbox to be unchecked
  expect(checkbox).not.toBeChecked();
});

test('Disabled button has gray color? and reverts to red', ()=> {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: "Disable"});

  fireEvent.click(checkbox);

  //expect button bg-color to be gray
  expect(colorButton).toHaveStyle({"background-color": "gray"});

  fireEvent.click(checkbox);

  //expect button bg-color to be red
  expect(colorButton).toHaveStyle({"background-color": "red"});
});

test('Clicked disabled button has gray and reverts to blue', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: "Disable"});

  fireEvent.click(colorButton);

  fireEvent.click(checkbox);
  //expect button bg-color to be gray
  expect(colorButton).toHaveStyle({"background-color": "gray"});

  fireEvent.click(checkbox);
  //expect button bg-color to be blue
  expect(colorButton).toHaveStyle({"background-color": "blue"});
});

describe('spaces before camel-case cpaital letters', () => {
  test('Works for no inner capital letter', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  })

  test('Works for multiple inner capital letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  })
})