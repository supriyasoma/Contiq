import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SearchPopUp } from "./";

export default {
  title: "Molecules/SearchPopUp",
  component: SearchPopUp,
} as Meta;

const Template: StoryFn<typeof SearchPopUp> = (args) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const combinedArgs = {
    ...args,
    isAccordionOpen,
    accordionClick: () => setIsAccordionOpen(!isAccordionOpen),
  };

  return <SearchPopUp {...combinedArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  searchedResultsList: [
    "Since being established in 1908 as a sewing machine repair business, the brother group has pursued the diversification and globalization of business in its history...",
    "repair business in the business area...",
  ],
  currentWord: 1,
  pageOf: 1,
  numberOfPages: 5,
  openSnackBar: () => {},
  closeSnackBar: () => {},
  upArrowClick: () => {},
  downArrowClick: () => {},
  copy: false,
  searchedWord: "Repair business",
  fileName: "Company agreement.pdf",
};
