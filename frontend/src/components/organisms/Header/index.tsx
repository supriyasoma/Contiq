import React, { useEffect, useState } from "react";
import theme from "../../../theme";
import styled from "@emotion/styled";
import MuiTypography from "../../atoms/Typograpy";
import {
  ADD_USER,
  APP_TITLE,
  HELP,
  NOTIFICATION_TEXT,
  SEARCH_PLACEHOLDER,
} from "../../../utils/constants";
import { Badge, Grid, Popover } from "@mui/material";
import { Icon } from "../../atoms/Icons";
import HelpIcon from "../../../../public/assets/icons/help.svg";
import NotificationCard from "../NotificationHeader";
import AddUsersIcon from "../../../../public/assets/icons/addUser.svg";
import NotificationIcon from "../../../../public/assets/icons/notifications.svg";
import LogoutPopup from "../../molecules/LogoutPopup";
import InputField from "../../atoms/InputField";
import SearchIcon from "../../../../public/assets/icons/searchBar.svg";
import SearchCard from "../../molecules/SearchCard";
import { profileData } from "../../../utils/fileData";
import { IFile } from "../../../utils/interfaces";
import {
  fetchUserDataByEmail,
  fileData,
  getFilesBySearchKeyword,
  updateNotificationCount,
} from "../../../services";
import { useNavigate } from "react-router-dom";

export interface IHeaderProp {
  searchClick?: (search: string) => void;
}

const HeaderContainer = styled("div")({
  height: "3.75rem",
  background: theme.palette.gradient.stokesy,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "1.25rem",
  paddingRight: "1.25rem",
});

const LeftContainer = styled("div")({
  float: "left",
});

const RightContainer = styled("div")({
  float: "right",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const MuiPopOver = styled(Popover)({
  "& .MuiPopover-paper": {
    marginTop: "0.5rem",
    borderRadius: "0.4375rem !important",
    boxShadow: "0.25rem 1rem 2rem 0rem rgba(213, 206, 221, 0.70) !important",
  },
});

const IconContainer = styled("div")({
  minWidth: "2.75rem",
  height: "2.75rem",
  borderRadius: "0.5rem",
  background: theme.palette.structuralColor.background2,
  marginLeft: "1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  opacity: 0.2,
  cursor: "pointer",
});

const IconWrapper = styled("div")({
  display: "inline-flex",
  justifyContent: "space-around",
  alignItems: "center",
  cursor: "pointer",
});

const CustomIcon = styled("div")({
  position: "absolute",
  marginLeft: "1.25rem",
  marginTop: "0.125rem",
});

const MuiBadge = styled(Badge)({
  ".MuiBadge-badge	": {
    top: `0.0625rem`,
    right: `0.3125rem `,
    padding: `0rem 0.1875rem`,
  },
});

const MuiPopOverStyle = {
  "& .MuiPopover-paper": {
    marginLeft: "-4.125rem",
    marginTop: "0.75rem",
  },
  ".css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
    borderRadius: `0.25rem !important`,
    boxShadow: `0.25rem 1rem 2rem 0rem rgba(213, 206, 221, 0.70)`,
  },
  border: `0.0625rem ${theme.palette.grey[100]}`,
};
const InputFieldStyle = {
  zIndex: 1,
  borderRadius: "0.375rem",
  ".MuiInputBase-input.MuiOutlinedInput-input": {
    color: "#FFFFFF",
    padding: "0.625rem 0.0625rem",
    "&::placeholder": {
      color: theme.palette.text.white,
      opacity: "5",
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    opacity: "0.2",
    background: theme.palette.gradient.main,
    border: 0,
    marginTop: "0.0625rem",
    height: "3rem",
  },
};

interface IFiledata {
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

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<boolean>(false);
  const [unread, setUnread] = useState<number>(0);
  const [data, setData] = useState<IFiledata[]>();
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<HTMLImageElement | null>(null);
  const [filesData, setFilesData] = useState<IFile[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchingFiles = async () => {
      const responseData = await fileData();
      setFilesData(responseData.files);
    };
    fetchingFiles();
  }, [unread]);

  useEffect(() => {
    fetchUserDataByEmail(localStorage.getItem("email") ?? "").then(
      (response) => {
        const calculatedUnread =
          (filesData?.length ?? 0) - parseInt(response?.notificationCount ?? 0);
        if (calculatedUnread >= 0) {
          setUnread(Math.abs(calculatedUnread));
        }
      }
    );
  }, [filesData]);

  const handleSearchCardVisibility = () => {
    setSearchStatus(!searchStatus);
  };

  const handleNotificationBar = async (
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    setNotificationAnchorEl(event.currentTarget);
    setNotificationStatus(!notificationStatus);
    if (unread !== 0) {
      updateNotificationCount(
        parseInt(localStorage.getItem("id") ?? "1"),
        filesData?.length
      );
      setUnread(0);
    }
    fileData().then((response) => {
      setFilesData(response);
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnChangeSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const searchedData = await getFilesBySearchKeyword(searchValue);
    setData(searchedData?.files);
    if (searchValue?.length > 0) {
      setSearchStatus(true);
    }
  };

  const handleLogoutClick = () => {
    setLogoutPopup(!logoutPopup);
  };

  const handleLabelClick = (id: number, label: string) => {
    if (search !== "") {
      navigate(`/${id}/${label}/${search}`);
    }
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <MuiTypography
          text={APP_TITLE}
          typoVariant="h3"
          color={theme.palette.text.white}
        />
      </LeftContainer>
      <RightContainer>
        <Grid>
          <InputField
            placeholder={SEARCH_PLACEHOLDER}
            type="text"
            value={search}
            onClick={handleClick}
            onChange={handleOnChangeSearch}
            adornment="start"
            sx={InputFieldStyle}
            src={SearchIcon}
          />
          <MuiPopOver
            anchorEl={anchorEl}
            open={searchStatus}
            onClose={handleSearchCardVisibility}
            onClick={handleSearchCardVisibility}
            data-testId="searchcontent"
            disableAutoFocus={true}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <SearchCard
              data={data}
              onLabelClick={handleLabelClick}
              data-testId="searchcard"
            />
          </MuiPopOver>
        </Grid>
        <IconWrapper>
          <IconContainer></IconContainer>
          <CustomIcon>
            <Icon src={HelpIcon} alt={HELP} />
          </CustomIcon>
        </IconWrapper>
        <IconWrapper>
          <IconContainer></IconContainer>
          <CustomIcon>
            <Icon src={AddUsersIcon} alt={ADD_USER} />
          </CustomIcon>
        </IconWrapper>
        <IconWrapper onClick={handleNotificationBar}>
          <IconContainer></IconContainer>
          <CustomIcon>
            <MuiBadge badgeContent={unread} color="error">
              <Icon src={NotificationIcon} alt={NOTIFICATION_TEXT} />
            </MuiBadge>
          </CustomIcon>
        </IconWrapper>
        {notificationStatus && (
          <MuiPopOver
            anchorEl={notificationAnchorEl}
            open={notificationStatus}
            disableAutoFocus={true}
            onClose={handleNotificationBar}
            onClick={handleNotificationBar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={MuiPopOverStyle}
          >
            <NotificationCard />
          </MuiPopOver>
        )}
        <LogoutPopup
          name={localStorage.getItem("name") ?? profileData.displayName}
          open={logoutPopup}
          handleClick={handleLogoutClick}
          handleClose={handleLogoutClick}
        />
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
