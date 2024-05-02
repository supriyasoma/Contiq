import React from "react";
import { StoryFn } from "@storybook/react";
import HomeBody from ".";
import { HomeDataItem } from "../../../utils/interfaces";
import { array } from "../../../utils/constants";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "organisms/HomeBody",
  component: HomeBody,
};

const emptyArray: HomeDataItem[] = [];

const Template: StoryFn<typeof HomeBody> = (args) => (
  <MemoryRouter>
    <HomeBody {...args} />
  </MemoryRouter>
);

export const Home = Template.bind({});
Home.args = {
  HomeData: array,
};

export const EmptyHome = Template.bind({});
EmptyHome.args = {
  HomeData: emptyArray,
};
