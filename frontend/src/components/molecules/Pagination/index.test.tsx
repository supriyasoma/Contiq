import { render, fireEvent } from "@testing-library/react";
import Pagination from ".";

describe("Pagination Component", () => {
  it("should interact with Pagination component", () => {
    const zoomInMock = jest.fn();
    const zoomOutMock = jest.fn();

    const { getByTestId, getByText } = render(
      <Pagination
        zoomIn={zoomInMock}
        zoomOut={zoomOutMock}
        currentPage={1}
        totalPages={10}
        zoomValue={100}
      />
    );

    const plusIcon = getByTestId("zoom-in");
    fireEvent.click(plusIcon);
    expect(zoomInMock).toHaveBeenCalledTimes(1);

    const minusIcon = getByTestId("zoom-out");
    fireEvent.click(minusIcon);
    expect(zoomOutMock).toHaveBeenCalledTimes(1);
    expect(getByText("Page 1 of 10")).toBeInTheDocument();
    expect(getByText("100%")).toBeInTheDocument();
  });
});
