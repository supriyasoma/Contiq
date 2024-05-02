import React from "react";
import { render } from "@testing-library/react";
import { SyncProgress } from ".";
import { SYNC_PROGRESS } from "../../../utils/constants";

describe("SyncProgress Component", () => {

  it("should render sync progress information correctly", () => {
    const { getByAltText, getByText } = render(
      <SyncProgress/>
    );
    expect(getByAltText(SYNC_PROGRESS.driveAltText)).toBeInTheDocument();
    expect(getByAltText(SYNC_PROGRESS.circleAltText)).toBeInTheDocument();
    expect(getByText(SYNC_PROGRESS.heading)).toBeInTheDocument();
    expect(getByText(SYNC_PROGRESS.subHeading)).toBeInTheDocument();
  });
});
