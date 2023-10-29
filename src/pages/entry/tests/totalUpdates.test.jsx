import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

test("updates toppings subtotal when topping changes", async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();

  //checks subtotal to 0.00
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  //updates cherries toppings to selected and checks the subtotal
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesInput); //checking the toppings
  expect(toppingsSubTotal).toHaveTextContent("1.50");

  //updates the Hot Fudge toppings to checked and checks the subtotal
  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });

  await user.click(hotFudgeInput); //checking the topping
  expect(toppingsSubTotal).toHaveTextContent("3.00");

  //unselecting the cherries topping
  await user.click(cherriesInput);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00 in beginning", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    //updates vanilla to 2 scoop and see the grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    //clearing the vanilla input
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2"); //putting the value
    expect(grandTotal).toHaveTextContent("4.00");

    //add cherries toppings and see the grand total
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput); //checking the toppings
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    //add cherries toppings and see the grand total
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput); //checking the toppings
    expect(grandTotal).toHaveTextContent("1.50");

    //updates vanilla to 2 scoop and see the grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    //clearing the vanilla input
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2"); //putting the value
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is remove", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    //add cherries toppings and see the grand total
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput); //checking the toppings

    //updates vanilla to 2 scoop and see the grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    //clearing the vanilla input
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2"); //putting the value

    //removes 1 scoop of vanilla
    //clearing the vanilla input
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1"); //putting the value

    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
