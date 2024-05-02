import React, { SyntheticEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionIcon from "../../../../public/assets/icons/accordionIcon.svg";
import LineIcon from "../../../../public/assets/icons/straightLine.svg";
import { styled } from "@mui/material/styles";
import { Icon } from "../../atoms/Icons";
import { Box, Stack } from "@mui/material";
import MuiTypography from "../../atoms/Typograpy";
import DropDownIcon from "../../../../public/assets/icons/dropDownIcon.svg";
import UpArrowIcon from "../../../../public/assets/icons/upArrow.svg";
import UpArrowDisableIcon from "../../../../public/assets/icons/upArrowDisable.svg";
import DownArrowDisableIcon from "../../../../public/assets/icons/downArrowDisable.svg";
import threeDotsIcon from "../../../../public/assets/icons/threeDots.svg";
import theme from "../../../theme";
import Snackbar from "../Snackbar";
import FormatStringWithBoldKeyword from "../../../utils/function";

interface SearchPopUpProps {
  searchedResultsList: string[];
  searchedWord: string;
  fileName: string;
  currentWord: number;
  pageOf: number;
  numberOfPages: number;
  openSnackBar: (event: Event | SyntheticEvent<any, Event>) => void;
  closeSnackBar: (event: Event | SyntheticEvent<any, Event>) => void;
  copy: boolean;
  upArrowClick: (event: Event | SyntheticEvent<any, Event>) => void;
  downArrowClick: (event: Event | SyntheticEvent<any, Event>) => void;
  isAccordionOpen: boolean;
  accordionClick: (event: Event | SyntheticEvent<any, Event>) => void;
  matchedIndex: number;
}

const CustomAccordion = styled(Accordion)({
  width: "24.125rem",
  paddingLeft: "8px",
  paddingRight: "8px",
  backgroundColor: theme.palette.grays.gray600,
  boxShadow: "none",
  border: `0.5px solid ${theme.palette.grays.gray100}`,
});

const CustomAccordionSummary = styled(AccordionSummary)({
  height: "2.5rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `0.0625rem solid ${theme.palette.grays.gray100}`,
  "& .MuiAccordionSummary-content": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const StyledStack = styled(Stack)({
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 1,
  marginRight: "1.25rem",
  borderRight: `0.0625rem solid ${theme.palette.grays.gray100}`,
  paddingRight: "1.25rem",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "0.75rem",
});
export const SearchPopUp = ({
  currentWord,
  searchedResultsList,
  pageOf,
  numberOfPages,
  openSnackBar,
  closeSnackBar,
  copy,
  searchedWord,
  fileName,
  upArrowClick,
  downArrowClick,
  isAccordionOpen,
  accordionClick,
  matchedIndex,
}: SearchPopUpProps) => {
  const noOfMatchedStrings = searchedResultsList?.length;

  return (
    <CustomAccordion onClick={accordionClick} data-testid="custom-accordion">
      <CustomAccordionSummary
        expandIcon={
          <Icon
            src={isAccordionOpen ? AccordionIcon : LineIcon}
            alt="Line Icon"
          />
        }
      >
        <StyledStack direction="row">
          <MuiTypography
            text={searchedWord}
            typoVariant="body2"
            color={theme.palette.text.black}
          />
          <MuiTypography
            text={`${currentWord}/${noOfMatchedStrings}`}
            typoVariant="body2"
          />
        </StyledStack>
        <Stack direction="row" gap={3} marginRight={"20px"}>
          <Icon
            src={currentWord === 1 ? UpArrowDisableIcon : UpArrowIcon}
            alt="up-arrow"
            onClick={currentWord === 1 ? () => {} : upArrowClick}
          />
          <Icon
            src={
              currentWord === noOfMatchedStrings
                ? DownArrowDisableIcon
                : DropDownIcon
            }
            alt="down-arrow"
            onClick={
              currentWord === noOfMatchedStrings ? () => {} : downArrowClick
            }
          />
        </Stack>
      </CustomAccordionSummary>
      <StyledBox>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
            <MuiTypography text={fileName} typoVariant="body1" />
            <MuiTypography
              text={`SLIDE ${pageOf}/${numberOfPages}`}
              typoVariant="overline1"
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Snackbar
              topPosition={"120%"}
              open={copy}
              handleClick={openSnackBar}
              handleClose={closeSnackBar}
            />
            <Icon src={threeDotsIcon} />
          </Stack>
        </Stack>
        <MuiTypography
          text={
            searchedResultsList[matchedIndex] ? (
              <FormatStringWithBoldKeyword
                inputString={searchedResultsList[matchedIndex]}
                matchedKeyword={searchedWord}
              />
            ) : null
          }
          typoVariant="body2"
          color={theme.palette.text.lowEmphasis}
          sx={{ textAlign: "left" }}
        />
      </StyledBox>
    </CustomAccordion>
  );
};
