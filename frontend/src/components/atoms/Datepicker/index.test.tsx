import { render, fireEvent, screen } from "@testing-library/react";
import DateSelector from "./";

describe("DateSelector Component", () => {
  it("renders with a date and a close icon when date is not empty", () => {
    const setDate = jest.fn();
    const setOpen = jest.fn();
    render(
      <DateSelector
        label="Select Date"
        date="Oct 24 2023"
        setDate={setDate}
        open={false}
        setOpen={setOpen}
      />
    );

    const dateText = screen.getByText("Oct 24 2023");
    const closeIcon = screen.getByTestId("close-icon");

    expect(dateText).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);
  });

  it("closes the date selector and clears the date on close icon click", async () => {
    const setDate = jest.fn();
    const setOpen = jest.fn();
    render(
      <DateSelector
        label="Select Date"
        date=""
        setDate={setDate}
        open={true}
        setOpen={setOpen}
      />
    );

    const labelElement = await screen.findByText("Select Date");
    const expandMoreIcon = await screen.findByTestId("icon");

    expect(labelElement).toBeInTheDocument();
    expect(expandMoreIcon).toBeInTheDocument();

    fireEvent.click(labelElement);

    const today = new Date();
    const todayDate = today.getDate().toString();

    const todayCell = screen.getAllByText(todayDate);
    todayCell.forEach((date) => {
      fireEvent.click(date);
    });
  });

  it("closes the date selector and clears the date on close icon click", async () => {
    const setDate = jest.fn();
    const setOpen = jest.fn();
    render(
      <DateSelector
        label="Select Date"
        date=""
        setDate={setDate}
        open={true}
        setOpen={setOpen}
      />
    );

    const labelElement = await screen.findByText("Select Date");
    const expandMoreIcon = await screen.findByTestId("icon");

    expect(labelElement).toBeInTheDocument();
    expect(expandMoreIcon).toBeInTheDocument();

    fireEvent.click(labelElement);

    fireEvent.click(expandMoreIcon);
  });

  it("closes the date selector and clears the date on close icon click", async () => {
    const setDate = jest.fn();
    const setOpen = jest.fn();
    render(
      <DateSelector
        label="Select Date"
        date=""
        setDate={setDate}
        open={false}
        setOpen={setOpen}
      />
    );

    const labelElement = await screen.findByText("Select Date");
    const expandMoreIcon = await screen.findByTestId("icon");

    expect(labelElement).toBeInTheDocument();
    expect(expandMoreIcon).toBeInTheDocument();

    fireEvent.click(labelElement);

    fireEvent.click(expandMoreIcon);
  });
});
