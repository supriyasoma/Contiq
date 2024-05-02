import React, { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { styled } from "@mui/system";
import close from "/public/assets/icons/darkClose.svg";
import avatar from "/public/assets/icons/avatar.svg";
import loader from "/public/assets/gifs/notification.gif";
import Notification from "../../molecules/AvatarWithTypography";
import theme from "../../../theme";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";
import { NOTIFICATIONS, months } from "../../../utils/constants";
import { fetchNotificationData } from "../../../services";

export interface NotificationProp {
  onClose?: () => void;
}
interface Notification {
  createdAt: string;
  action: string;
  userName: string;
  fileName: string;
  id: number;
}

const StyledBox = styled(Box)({
  width: theme.spacing(100),
  height: theme.spacing(113.5),
  border: `1px solid ${theme.palette.grays.gray100}`,
  backgroundColor: theme.palette.text.white,
  borderRadius: theme.spacing(1),
  boxShadow: `${theme.spacing(1)} ${theme.spacing(4)} ${theme.spacing(8)} 0
    ${theme.palette.grays.gray700}`,
});

const StyleDivider = styled(Divider)({
  width: "100%",
});

const ScrollableContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflowX: "hidden",
  overflowY: "auto",
  maxHeight: `calc(${theme.spacing(115.5)} - ${theme.spacing(15.5)})`,
  "::-webkit-scrollbar": {
    width: theme.spacing(1.5),
    padding: theme.spacing(10),
  },
  "::-webkit-scrollbar-track": {
    background: theme.palette.grays.gray600,
  },
  "::-webkit-scrollbar-thumb": {
    background: theme.palette.grays.gray100,
    borderRadius: theme.spacing(16),
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const TextContainer = styled(Box)({
  padding: "12px",
  borderBottom: `1px solid ${theme.palette.grays.gray100}`,
});

const CloseIconContainer = styled(Box)({
  cursor: "pointer",
});

const InnerStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const OuterStack = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "center",
  spacing: 32,
});

const NotificationCard = ({ onClose }: NotificationProp) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [mockNotifications, setMockNotifications] = useState<Notification[]>(
    []
  );
  const reversedNotifications = [...mockNotifications].reverse();

  useEffect(() => {
    setLoading(true);
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    fetchNotificationData().then((response) => {
      setMockNotifications(response);
    });
  }, []);

  function formatDate(inputDateString: string) {
    const inputDate = new Date(inputDateString);
    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    const formattedDate = `${day} ${month} ${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedDate;
  }

  return (
    <StyledBox>
      <TextContainer>
        <OuterStack direction="row">
          <MuiTypography
            text={NOTIFICATIONS.heading}
            typoVariant={"h3"}
            color={theme.palette.text.black}
          />
          <CloseIconContainer
            onClick={onClose}
            data-testid="notication-close-button"
          >
            <Icon src={close} alt={NOTIFICATIONS.closeAltText} />
          </CloseIconContainer>
        </OuterStack>
      </TextContainer>
      {loading ? (
        <InnerStack data-testid="loading-indicator">
          <Icon
            src={loader}
            alt={NOTIFICATIONS.loadAltText}
            width={theme.spacing(57.5)}
            height={theme.spacing(57.5)}
          />
        </InnerStack>
      ) : (
        <Stack onClick={onClose}>
          <ScrollableContainer data-testid="notification-list">
            {reversedNotifications?.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <Notification
                  key={notification.id}
                  name={
                    notification.userName.includes(" ")
                      ? notification.userName.split(" ")[0]
                      : notification.userName
                  }
                  userAction={notification.action}
                  fileName={notification.fileName}
                  dateTime={formatDate(notification.createdAt)}
                  avatarSrc={avatar}
                  avatarAlt={NOTIFICATIONS.avatarAltText}
                />
                {index < mockNotifications.length - 1 && <StyleDivider />}
              </React.Fragment>
            ))}
          </ScrollableContainer>
        </Stack>
      )}
    </StyledBox>
  );
};

export default NotificationCard;
