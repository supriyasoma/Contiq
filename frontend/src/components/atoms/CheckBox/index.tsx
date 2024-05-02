import React from "react";
import {
  Checkbox as MuiCheckBox,
  CheckboxProps,
  FormControlLabel,
  styled,
} from "@mui/material";

import { checkboxClasses } from "@mui/material/Checkbox";
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from "@mui/icons-material";
import theme from "../../../theme";

export interface CheckboxCustomProps extends CheckboxProps {
  label: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
}

const CustomCheckbox = styled(MuiCheckBox)(
  ({ isDisabled }: { isDisabled?: boolean }) => ({
    [`&.${checkboxClasses.colorPrimary}`]: {
      color: isDisabled
        ? theme.palette.grays.gray100
        : theme.palette.text.white,
    },
  }),
  { marginRight: theme.spacing(1) }
);

const Checkbox = (props: CheckboxCustomProps) => {
  return (
    <FormControlLabel
      control={
        <CustomCheckbox
          data-testid="checkBox"
          icon={<CheckBoxOutlineBlankOutlined />}
          checkedIcon={<CheckBoxOutlined />}
          disableRipple
          isDisabled={props.disabled}
          disabled={props.disabled}
        />
      }
      label={props.label}
      checked={props.checked}
      onClick={props.onClick}
    />
  );
};

export default Checkbox;
