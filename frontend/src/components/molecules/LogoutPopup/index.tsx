import React from "react";
import Avatar from "../../atoms/Avatar";
import { IconButton, Menu, MenuItem, Stack, styled } from "@mui/material";
import { Icon } from "../../atoms/Icons";
import AvatarIcon from "/public/assets/icons/avatar.svg";
import AvatarArrowIcon from "/public/assets/icons/avatarArrow.svg";
import MuiTypography from "../../atoms/Typograpy";
import theme from "../../../theme";
import IconWithTypography from "../IconWithTypography";
import { logoutOptions } from "../../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

interface LogoutPopupProps {
  name: string;
  open: boolean;
  handleClick: () => void;
  handleClose: () => void;
}

const Container = styled(IconButton)(({ open }: { open: boolean }) => ({
  display: "flex",
  gap: "0.9375rem",
  width: "fit-content",
  height: "2.75rem",
  placeItems: "center",
  marginLeft: "0.875rem",
}));

const StyledMenu = styled(Menu)({
  "&.MuiMenu-root": {
    marginTop: "50px",
    marginLeft: "-0.725rem",
  },
  "& .MuiPaper-root": {
    width: "11.1875rem",
    border: `0.0625rem solid ${theme.palette.grays.gray100} !important`,
    boxShadow: "none !important",
  },
  "& .MuiList-root": {
    paddingTop: "0rem",
  },
});

const CustomMenuItem = styled(MenuItem)({
  "&:hover": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "&:focus": {
    background: "none",
  },
});

const HeaderCustomMenuItem = styled(MenuItem)({
  "&:hover": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "&:focus": {
    background: "none",
  },
  borderBottom: `0.0625rem solid ${theme.palette.grays.gray100}`,
  marginBottom: "0.625rem",
});

const CustomAvatar = styled(Avatar)({
  width: "2.25rem",
  height: "2.25rem",
});

const LogoutPopup = ({
  name,
  open,
  handleClick,
  handleClose,
}: LogoutPopupProps) => {
  const {  logout } = useAuth0();

  const handleLogOut = (option: string) => {
    if (option === "Logout") {
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("token", "");
      logout();
    }
  };

  return (
    <React.Fragment>
      <Container
        disableRipple
        disableFocusRipple
        open={open}
        onClick={handleClick}
      >
        {open ? (
          <Icon src={AvatarArrowIcon} alt="AvatarArrowIcon" />
        ) : (
          <CustomAvatar src={AvatarIcon} alt="avatar" />
        )}
      </Container>
      <StyledMenu
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <HeaderCustomMenuItem>
          <Stack gap="0.125rem">
            <MuiTypography
              text={name}
              typoVariant="body1"
              sx={{ color: theme.palette.text.black }}
            />
            <MuiTypography
              text="IDJR00292"
              typoVariant="overline1"
              sx={{ color: theme.palette.text.lowEmphasis }}
            />
          </Stack>
        </HeaderCustomMenuItem>
        {Object.entries(logoutOptions).map(([option, IconComponent]) => (
          <CustomMenuItem key={option} onClick={() => handleLogOut(option)}>
            <IconWithTypography
              direction="row"
              gap="0.625rem"
              alignDirection="center"
              IconComponent={<Icon src={IconComponent} alt={option} />}
              TextComponent={
                <MuiTypography
                  text={option}
                  typoVariant="body2"
                  sx={{ color: theme.palette.text.black }}
                />
              }
            />
          </CustomMenuItem>
        ))}
      </StyledMenu>
    </React.Fragment>
  );
};

export default LogoutPopup;
