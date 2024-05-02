import React, { useState } from "react";
import DateSelector from ".";

export default {
  title: "Atoms/DateSelector",
  component: DateSelector,
};

export const StartDate = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [open, setOpen] = useState(false);

  return (
    <DateSelector
      label="Start Date"
      date={selectedDate}
      setDate={setSelectedDate}
      open={open}
      setOpen={setOpen}
    />
  );
};
