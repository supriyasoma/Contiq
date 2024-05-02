import React, { useRef } from "react";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { Box, Popover, Typography, styled } from "@mui/material";
import { DAYS_OF_WEEK } from "../../../utils/constants";
import theme from "../../../theme";
import { Icon } from "../Icons";
import { Close } from "@mui/icons-material";
import DropDown from "../../../../public/assets/icons/dropDown.svg";
import UpArrow from "../../../../public/assets/icons/upArrow.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface CalendarProps {
  label: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  minDate?: string;
  maxDate?: string;
}

const dateCalendarStyles = {
  ".MuiPickersCalendarHeader-root": {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    paddingBottom: "12px",
  },
  ".MuiPickersCalendarHeader-root:first-child": {
    border: 0,
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  ".MuiPickersArrowSwitcher-root": {
    display: "flex",
    marginLeft: "-12px",
  },
  ".MuiPickersCalendarHeader-label": {
    textAlign: "center",
    color: theme.palette.text.white,
  },
  ".MuiPickersArrowSwitcher-spacer": {
    width: "250px",
  },
  ".css-31ca4x-MuiPickersFadeTransitionGroup-root": {
    display: "flex",
    position: "absolute",
    paddingLeft: "100px",
  },
  ".MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer":
    {
      borderTop: `1px solid ${theme.palette.grays.gray300}`,
    },
  ".MuiPickersArrowSwitcher-button": {
    paddingRight: "7px",
    color: theme.palette.grays.gray100,
  },
  ".MuiDayCalendar-weekDayLabel": {
    color: theme.palette.text.highEmphasis,
  },
  ".MuiPickersDay-root": {
    color: theme.palette.text.white,
  },
  ".MuiPickersDay-today": {
    background: theme.palette.grays.gray300,
    borderRadius: "2px",
    color: theme.palette.text.white,
  },
  ".MuiButtonBase-root.MuiPickersDay-root:not(.Mui-selected)": {
    border: 0,
  },
  ".MuiPickersDay-root.Mui-disabled:not(.Mui-selected)": {
    color: theme.palette.text.lowEmphasis,
  },
  ".MuiPickersDay-dayOutsideMonth": {
    color: theme.palette.text.lowEmphasis,
  },
  ".css-7se398-MuiPickersCalendarHeader-labelContainer": {
    marginLeft: "2rem",
  },
  ".css-1bx5ylf": {
    display: "block",
    position: "absolute",
    margin: "30%",
  },
  background: theme.palette.grays.gray400,
  border: `1px solid ${theme.palette.grays.gray100}`,
};

const StyledBox = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  height: "36px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grays.gray100}`,
  background: theme.palette.text.white,
});

const CustomPopover = styled(Popover)({
  position: "absolute",
  top: "0.625rem",
});

const DateSelector = (props: CalendarProps) => {
  const { label, date, setDate, open, setOpen, minDate, maxDate } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopover = () => {
    setOpen(!open);
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const closeClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDate("");
    setOpen(false);
  };

  const dayOfWeekFormatter = (dayOfWeek: string) =>
    DAYS_OF_WEEK.get(dayOfWeek) ?? "";

  const handleDateCalendarChange = (value: string | null) => {
    const date = new Date(value!);
    const year = date.getFullYear();
    const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
      date
    );
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("en", { weekday: "short" });

    setDate(`${dayOfWeekFormatter(dayOfWeek)} ${day} ${monthName} ${year}`);
    setOpen(false);
  };

  const getIcon = () => {
    if (date === "") {
      return open ? (
        <Icon src={UpArrow} data-testid="expand-less-icon" />
      ) : (
        <Icon
          src={DropDown}
          onClick={togglePopover}
          data-testid="expand-more-icon"
        />
      );
    } else {
      return <Close onClick={closeClickHandler} data-testid="close-icon" />;
    }
  };

  const shouldDisableDate = (day: string) => {
    const currentDay = dayjs(day);
    return (
      currentDay.isBefore(dayjs(minDate), "day") ||
      currentDay.isAfter(dayjs(maxDate), "day")
    );
  };

  return (
    <>
      <StyledBox
        onClick={togglePopover}
        ref={buttonRef}
        data-testid="date-selector-wrapper"
        style={{
          border:
            date === ""
              ? `1px solid ${theme.palette.grays.gray100}`
              : `1px solid ${theme.palette.primary.light}`,
          background:
            date === ""
              ? theme.palette.text.white
              : theme.palette.primary.light,
        }}
      >
        <Typography
          variant="body1"
          color={date === "" ? "initial" : theme.palette.text.black}
        >
          {date === "" ? label : date}
        </Typography>
        {getIcon()}
      </StyledBox>
      <CustomPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{ position: "absolute", top: "0.625rem" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            date-testid="date-calendar"
            onChange={handleDateCalendarChange}
            sx={dateCalendarStyles}
            views={["day"]}
            disableFuture
            showDaysOutsideCurrentMonth
            dayOfWeekFormatter={dayOfWeekFormatter}
            shouldDisableDate={shouldDisableDate}
          />
        </LocalizationProvider>
      </CustomPopover>
    </>
  );
};

export default DateSelector;
