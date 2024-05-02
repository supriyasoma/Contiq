import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CheckBox from ".";
import MuiTypography from "../Typograpy";
import theme from "../../../theme";
import { Icon } from "../Icons";
import fileIcon from "/public/assets/icons/fileBoxIcon.svg";
import { Stack } from "@mui/material";
export default {
  title: "Atoms/Checkbox",
  component: CheckBox,
} as Meta;
const Template: StoryFn<typeof CheckBox> = (args) => <CheckBox {...args} />;
export const Default = Template.bind({});
Default.args = {
  disabled: true,
  checked: false,
  label: (
    <MuiTypography
      text={"Remember me"}
      typoVariant={"caption1"}
      color={theme.palette.text.lowEmphasis}
    />
  ),
  onClick: action("Changed state"),
};

export const Custom = Template.bind({});
Custom.args = {
  label: (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      pl={3}
    >
      <Icon src={fileIcon} alt={"file"} />
      <MuiTypography
        text={"Company overview"}
        typoVariant={"body1"}
        color={theme.palette.text.white}
      />
    </Stack>
  ),
  checked: false,
  onClick: action("Changed state"),
};
