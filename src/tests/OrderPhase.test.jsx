import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order phases for happy paht", async () => {
  const user = userEvent.setup();
  //render app
  const { unmount } = render(<App />);
  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //clearing the vanilla input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1"); //putting the value

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  //clearing the chocolate input
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2"); //putting the value

  //add cherries toppings
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput); //checking the toppings

  //find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  //check summary subtotals. based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //check summary opton items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //accept t&c and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  //expect loading to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //confirm order on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  //expect loader disappeared from the document
  const notLoading = screen.queryByText("Loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNo = await screen.findByText(/order number/i);
  expect(orderNo).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  //check that scoops and toppings values have been reset
  const scoopsTotal = await screen.findByText("Scoops Total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings Total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  //unmount
  unmount();
});
