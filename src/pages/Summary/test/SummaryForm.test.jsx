import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test('Initial Conditions', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
    const button = screen.getByRole('button', { name: /confirm order/i});

    //initial checkbox condition to be unchecked
    expect(checkbox).not.toBeChecked();
    //initial button condition to be disabled
    expect(button).toBeDisabled();
});

test('Checks if button gets enabled on 1st click and disabled on other', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
    const button = screen.getByRole('button', { name: /confirm order/i});

    fireEvent.click(checkbox);

    //checkbox condition to be checked after clicked
    expect(checkbox).toBeChecked();
    //button condition to be enabled
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);

    //checkbox condition to be unchecked after clicked
    expect(checkbox).not.toBeChecked();
    //button condition to be disabled
    expect(button).toBeDisabled();
})