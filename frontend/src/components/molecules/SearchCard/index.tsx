import React from "react";
import { styled } from "@mui/system";
import { List, ListItem, ListItemButton } from "@mui/material";
import LearnBasics from "../../../../public/assets/icons/searchCard.svg";
import PowerUser from "../../../../public/assets/icons/searchCardBottom.svg";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typograpy";
import {
  DOCUMENT_IMG1_ALT,
  DOCUMENT_IMG2_ALT,
  OTHER_DOCUMENTS_TXT,
  SEARCH_RESULT,
} from "../../../utils/constants";
import { Icon } from "../../atoms/Icons";

interface SearchDataDetails {
  fileId: string;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
  trashed: boolean;
  synced: boolean;
  createdOn: string;
  updatedOn: string;
  content: string;
}

interface SearchDataProp {
  data?: Array<SearchDataDetails>;
  onLabelClick: (id: number, label: string) => void;
}

const SearchCardContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "282px",
  width: "355px",
  borderRadius: "7px",
  boxSizing: "border-box",
  backgroundColor: theme.palette.text.white,
  border: `1px solid ${theme.palette.grey[300]}`,
  overflow: "hidden",
  position: "relative",
});

const HeaderContainer = styled("div")({
  boxSizing: "border-box",
  display: "flex",
  height: "40px",
  paddingLeft: "1.0625rem",
  position: "fixed",
  width: "330px",
  background: theme.palette.background.default,
  borderRadius: "7px",
  zIndex: "1",
});

const ScrollbarWrapper = styled("div")({
  flex: 1,
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "14px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F0F0F0",
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D9D9D9",
    borderRadius: "16px",
    width: "6px",
    height: "196px",
    border: " 4px solid transparent",
    backgroundClip: "content-box",
  },
});

const ListItemContainer = styled("div")({
  height: "auto",
  maxHeight: "120px",
});

const BodyContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "18px",
  backgroundColor: theme.palette.text.white,
  position: "absolute",
  top: "158px",
});

const ImageContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "20.997px",
  paddingBottom: "15px",
});

const ScrollList = styled(List)({
  width: "100%",
  marginTop: "2.125rem",
  marginBottom: "100px",
});

const DocumentTypography = styled(MuiTypography)({
  marginBottom: "8px",
  height: "20px",
});

const ItemButtonList = styled(ListItemButton)({
  "&.MuiButtonBase-root": {
    boxSizing: "border-box",
    textAlign: "left",
    padding: "0px",
  },
});

const ItemList = styled(ListItem)({
  marginBottom: "16px",
  paddingLeft: "1.0625rem",
});

const SearchCard = (props: SearchDataProp) => {
  return (
    <SearchCardContainer>
      <HeaderContainer>
        <MuiTypography
          text={SEARCH_RESULT}
          typoVariant="caption1"
          color={theme.palette.text.black}
          sx={{ marginTop: "0.75rem" }}
        />
      </HeaderContainer>
      <ScrollbarWrapper>
        <ScrollList>
          {props.data?.map((data) => (
            <ListItemContainer key={data.fileId}>
              <ItemList disablePadding>
                <ItemButtonList
                  onClick={() => {
                    props.onLabelClick(data.userId, data.fileName);
                  }}
                  data-testid={`item-click-${data.fileId}`}
                >
                  <MuiTypography
                    text={data.fileName}
                    typoVariant="body2"
                    sx={{
                      color: theme.palette.text.lowEmphasis,
                    }}
                  />
                </ItemButtonList>
              </ItemList>
            </ListItemContainer>
          ))}
        </ScrollList>
      </ScrollbarWrapper>
      <BodyContainer>
        <DocumentTypography text={OTHER_DOCUMENTS_TXT} typoVariant="caption1" />
        <ImageContainer>
          <Icon alt={DOCUMENT_IMG1_ALT} src={LearnBasics} />
          <Icon alt={DOCUMENT_IMG2_ALT} src={PowerUser} />
        </ImageContainer>
      </BodyContainer>
    </SearchCardContainer>
  );
};
export default SearchCard;
