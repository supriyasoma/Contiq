import { Icon } from "../../atoms/Icons";
import drive from "/public/assets/images/gdrive.svg";
import MuiTypography from "../../atoms/Typograpy";
import { Box, Stack, styled } from "@mui/material";
import theme from "../../../theme";
import circular from "/public/assets/gifs/circular.gif";
import { SYNC_PROGRESS } from "../../../utils/constants";

const StyledText = styled(MuiTypography)({
  width: theme.spacing(47.25),
  height: theme.spacing(11),
  textAlign: "center",
});

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(5),
  height: "80%",
});

const HeaderBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  height: "10%",
  marginRight: theme.spacing(3),
  marginTop: theme.spacing(3),
  cursor: "pointer",
});

const FooterBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: `${theme.spacing(0)} ${theme.spacing(5)}`,
});

export const SyncProgress = () => {
  return (
        <MainBox>
          <Icon
            src={drive}
            alt={SYNC_PROGRESS.driveAltText}
            width={theme.spacing(21.5)}
            height={theme.spacing(21.5)}
          />
          <Stack direction="row" gap={2}>
            <Icon
              src={circular}
              alt={SYNC_PROGRESS.circleAltText}
              width={theme.spacing(7.5)}
              height={theme.spacing(7.5)}
            />
            <MuiTypography
              text={SYNC_PROGRESS.heading}
              typoVariant={"h3"}
              color={theme.palette.text.white}
            />
          </Stack>
          <StyledText
            text={SYNC_PROGRESS.subHeading}
            typoVariant={"body2"}
            color={theme.palette.text.highEmphasis}
          />
        </MainBox>
  );
};
