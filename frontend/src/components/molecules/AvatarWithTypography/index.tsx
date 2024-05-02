import { Box, Stack, styled } from "@mui/material";
import MuiTypography from "../../atoms/Typograpy";
import theme from "../../../theme";
import Avatar from "../../atoms/Avatar";

interface NotificationCardProps {
  fileName: string;
  userAction: string;
  dateTime: string;
  avatarSrc: string;
  avatarAlt: string;
  name: string;
}
const OuterBox = styled(Box)({
  width: theme.spacing(120),
  height: theme.spacing(16.5),
  display: "flex",
  padding: theme.spacing(3),
  alignItems: "center",
  gap: theme.spacing(3),
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "4px",
});
const NotificationCard = (props: NotificationCardProps) => {
  return (
    <OuterBox>
      <Avatar src={props.avatarSrc} alt={props.avatarAlt} />
      <Stack gap={1}>
        <StyledBox gap={1} sx={{}}>
          <MuiTypography
            text={props.name}
            typoVariant={"body1"}
            color={theme.palette.text.black}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "3rem",
            }}
          />
          <MuiTypography
            text={`has ${props.userAction} ${props.fileName}`}
            typoVariant={"body2"}
            color={theme.palette.text.lowEmphasis}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "17rem",
            }}
          />
        </StyledBox>
        <MuiTypography
          text={props.dateTime}
          typoVariant={"caption1"}
          color={theme.palette.text.mediumEmphasis}
        />
      </Stack>
    </OuterBox>
  );
};
export default NotificationCard;
