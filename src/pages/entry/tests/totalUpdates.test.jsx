import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("updates scoop subtotal when scoop changes", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  //checks subtotal to 0.00
  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");

  //updates vanilla scoop to 1 and checks the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //clearing the vanilla input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1"); //putting the value
  expect(scoopsSubTotal).toHaveTextContent("2.00");

  //updates the chocolate scoop to 2 and checks the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  //clearing the chocolate input
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2"); //putting the value
  expect(scoopsSubTotal).toHaveTextContent("6.00");
});

// test('updates toppings subtotal when topping changes', () => {

// });
