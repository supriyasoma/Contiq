import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import Button from ".";
import { Typography } from "@mui/material";
import add from "/public/assets/icons/add.svg";
import theme from "../../../theme";
export default {
  title: "Atoms/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Typography children="Create account" variant="body1" />,
  variant: "contained",
  onClick: action("Create Account Button is clicked"),
  sx: {
    width: theme.spacing(89),
    height: theme.spacing(12),
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: <Typography children="Create account" variant="body1" />,
  variant: "contained",
  onClick: action("Disable Button is clicked"),
  style: {
    width: theme.spacing(89),
    height: theme.spacing(12),
  },
  disabled: true,
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  children: <Typography children="Add files" variant="body1" />,
  variant: "contained",
  onClick: action("Add file Button is clicked"),
  sx: {
    width: theme.spacing(30),
    height: theme.spacing(9),
    padding: "6px 8px",
    alignItems: "center",
  },
  startIcon: (
    <img
      src={add}
      width={theme.spacing(6)}
      height={theme.spacing(6)}
      alt={"Add Icon"}
    />
  ),
};
export const Outlined = Template.bind({});
Outlined.args = {
  children: "Choose files",
  variant: "outlined",
  sx: { width: "166px", height: "46px" },
  disabled: false,
};
