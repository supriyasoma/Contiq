import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { FILE_DATA } from "../../../utils/fileData";
import SearchCard from ".";

export default {
  title: "molecules/Searchcard",
  component: SearchCard,
} as Meta<typeof SearchCard>;

const Template: StoryFn<typeof SearchCard> = (args) => {
  return <SearchCard {...args} />;
};
export const searchCard = Template.bind({});
searchCard.args = {
  data: FILE_DATA,
};
