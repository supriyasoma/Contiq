import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchCard from "./index";
import { FILE_DATA } from "../../../utils/fileData";

describe("SearchCard Component", () => {
  const handleLabel = jest.fn();

  it("should render without errors", () => {
    render(<SearchCard data={FILE_DATA} onLabelClick={handleLabel} />);
  });

  it("should handle item click will render recommended search", () => {
    const { getByText } = render(
      <SearchCard data={FILE_DATA} onLabelClick={handleLabel} />
    );
    const firstFile = getByText("Company agreement.pdf");
    const secondFile = getByText("Software agreement2.pdf");
    expect(firstFile).toBeInTheDocument();
    expect(secondFile).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("item-click-1"));
    expect(handleLabel).toHaveBeenCalled();
  });
});
