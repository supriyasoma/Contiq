import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import NOFIle from "../../../../public/assets/icons/noFiles.svg";
import { HomeDataItem } from "../../../utils/interfaces";
import MuiTypography from "../../atoms/Typograpy";
import { FileCard } from "../../molecules/FileCard";
import { Icon } from "../../atoms/Icons";
import theme from "../../../theme";
import { NO_FILES, SYNC } from "../../../utils/constants";
import Agreement from "../../../../public/assets/images/fileCard.svg";
import { useNavigate } from "react-router-dom";
interface HomeBodyProps {
  HomeData: HomeDataItem[];
}

const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
}));

const TypoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: theme.spacing(85),
  gap: theme.spacing(3),
  alignItems: "center",
}));

const MuiBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});

const HomeTypography = styled(MuiTypography)({
  color: theme.palette.text.black,
  display: "flex",
  justifyContent: "flex-start",
  padding: "24px",
});

const RecentTypography = styled(MuiTypography)({
  color: theme.palette.text.lowEmphasis,
  display: "flex",
  paddingLeft: "24px",
});

const NoFileTypography = styled(MuiTypography)({
  color: theme.palette.text.black,
});

const SyncTypography = styled(MuiTypography)({
  color: theme.palette.text.lowEmphasis,
});

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  padding-left: 24px;
  justify-content: "flex-start";
  height: 67vh;
  overflow: auto;
  margin-right: 25px;

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 16px;
    width: 6px;
    height: 196px;
    border: 4px solid transparent;
    background-clip: content-box;
  }
`;

const HomeBody = (props: HomeBodyProps) => {
  const [allFiles, setAllFiles] = useState<HomeDataItem[]>([]);

  const navigate = useNavigate();

  const handlePdf = (id: number, name: string) => {
    navigate(`/file/${id}/${name}`);
  };

  useEffect(() => {
    setAllFiles(props.HomeData);
  }, [props.HomeData]);

  return (
    <MuiBox data-testid="homeBody">
      <HomeTypography typoVariant="h2" text="Home" />

      {allFiles && allFiles.length !== 0 && (
        <RecentTypography typoVariant="h3" text="Recent" />
      )}

      {allFiles && allFiles.length > 0 ? (
        <StyledBox data-testid="file-card">
          {allFiles
            .slice()
            .reverse()
            .map((card) => (
              <FileCard
                key={card.fileId}
                pdfImage={Agreement}
                fileName={card.fileName}
                handleDoubleClick={() => {
                  handlePdf(card.userId, card.fileName);
                }}
              />
            ))}
        </StyledBox>
      ) : (
        <ImageBox>
          <MainBox data-testid="image-typography">
            <Icon src={NOFIle} alt="no-file-image" />
            <TypoBox>
              <NoFileTypography typoVariant="subtitle1" text={NO_FILES} />
              <SyncTypography typoVariant="body2" text={SYNC} />
            </TypoBox>
          </MainBox>
        </ImageBox>
      )}
    </MuiBox>
  );
};

export default HomeBody;
