import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LogoutPopup from ".";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router";

export default {
  title: "Molecules/LogoutPopup",
  component: LogoutPopup,
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Story />
      </Box>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof LogoutPopup> = (args) => (
  <MemoryRouter>
    <LogoutPopup {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  name: "John Ross",
  open: false,
  handleClick: action("Menu is opened!"),
  handleClose: action("Menu is closed!"),
};
