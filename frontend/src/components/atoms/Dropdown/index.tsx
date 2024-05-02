import React, { ReactElement } from "react";
import {
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import theme from "../../../theme/index";
import ExpandMoreIcon from "../../../../public/assets/icons/chevron.svg";
import CloseIcon from "../../../../public/assets/icons/closeIcon.svg";
import MuiTypography from "../Typograpy";
import { Icon } from "../Icons";

interface DropdownProps {
  options: string[];
  placeholder: string;
  header: string;
  value: string;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  handleClear: () => void;
  menuOpen: boolean;
  handleMenu: () => void;
  dataTestId?: string;
}

const CustomSelect = styled(Select)(
  ({ selectValue }: { selectValue: string }) => ({
    background:
      selectValue !== ""
        ? theme.palette.primary.light
        : theme.palette.text.white,
    border:
      selectValue !== ""
        ? `0.0625rem solid ${theme.palette.primary.light}`
        : `0.0625rem solid ${theme.palette.grays.gray100}`,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
      padding: "0.3125rem 0.125rem 0.3125rem 0.5rem",
    },
  })
);

const paperStyles = {
  background: theme.palette.grays.gray400,
  color: theme.palette.text.white,
  borderRadius: "0.25rem",
  width: "15.625rem",
  marginTop: "0.5rem",
};

const RenderIconComponent = ({
  value,
  menuOpen,
  handleClear,
}: {
  value: string;
  menuOpen: boolean;
  handleClear?: () => void;
}) => {
  return value !== "" ? (
    <IconButton style={{ cursor: "pointer" }} onClick={handleClear}>
      <Icon src={CloseIcon} alt="CloseIcon" />
    </IconButton>
  ) : (
    <IconButton>
      <Icon
        src={ExpandMoreIcon}
        alt="ChevronIcon"
        sx={{
          transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
      />
    </IconButton>
  );
};

const Dropdown = ({
  options,
  placeholder,
  header,
  value,
  handleChange,
  handleClear,
  menuOpen,
  handleMenu,
  dataTestId,
}: DropdownProps) => {
  return (
    <CustomSelect
      value={value === "" ? placeholder : value}
      selectValue={value}
      onChange={handleChange}
      data-testid={dataTestId}
      IconComponent={() =>
        (
          <RenderIconComponent
            value={value}
            menuOpen={menuOpen}
            handleClear={handleClear}
          />
        ) as ReactElement
      }
      size="small"
      onOpen={handleMenu}
      onClose={handleMenu}
      inputProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          sx: {
            "&& .Mui-selected": {
              background: "transparent",
            },
          },
          PaperProps: {
            sx: paperStyles,
          },
        },
      }}
    >
      <MenuItem value={placeholder} style={{ display: "none" }}>
        <MuiTypography typoVariant="body1" text={placeholder} />
      </MenuItem>
      <MenuItem style={{ pointerEvents: "none" }}>
        <MuiTypography typoVariant="body1" text={header} />
      </MenuItem>
      <Divider sx={{ backgroundColor: theme.palette.text.lowEmphasis }} />
      {options.map((option) => (
        <MenuItem
          key={option}
          value={option}
          sx={{ color: theme.palette.text.highEmphasis }}
        >
          <MuiTypography typoVariant="body1" text={option} />
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

export default Dropdown;
