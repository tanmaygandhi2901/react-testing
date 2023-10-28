import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  //initial checkbox condition to be unchecked
  expect(checkbox).not.toBeChecked();
  //initial button condition to be disabled
  expect(button).toBeDisabled();
});

test("Checks if button gets enabled on 1st click and disabled on other", async () => {
  //creating the user event
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);

  //checkbox condition to be checked after clicked
  expect(checkbox).toBeChecked();
  //button condition to be enabled
  expect(button).toBeEnabled();

  await user.click(checkbox);

  //checkbox condition to be unchecked after clicked
  expect(checkbox).not.toBeChecked();
  //button condition to be disabled
  expect(button).toBeDisabled();
});

test("Popover moments, showing on hover, hiding on unhover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).toBeNull();

  //popover is in dom
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  //popover gets hidden
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();

});
