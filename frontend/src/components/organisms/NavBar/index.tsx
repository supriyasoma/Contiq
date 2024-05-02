import { useState } from "react";
import { Box, Stack, styled } from "@mui/material";
import theme from "../../../theme";
import { SIDEBAR } from "../../../utils/constants";
import NavItem from "../../molecules/NavItem";
import { Icon } from "../../atoms/Icons";
import settings from "/public/assets/icons/settings.svg";
import { useNavigate } from "react-router-dom";

const OuterBox = styled(Box)({
  display: "flex",
  width: "82px",
  height: "94vh",
  flexShrink: 0,
  background: theme.palette.grays.gray500,
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "20px",
});

const StyleBox = styled(Box)(({ name }: { name: string }) => ({
  cursor:
    name === SIDEBAR[0].text || name === SIDEBAR[4].text
      ? "pointer"
      : "default",
}));

const SideBar = (props: { selectedItem?: string }) => {
  const [isActive, setIsActive] = useState<string>(
    props.selectedItem ?? SIDEBAR[0].text
  );

  const navigate = useNavigate();

  const handleItemClick = (name: string) => {
    switch (name) {
      case SIDEBAR[0].text:
        navigate("/home");
        setIsActive(name);
        break;
      case SIDEBAR[4].text:
        navigate("/file");
        setIsActive(name);
        break;
    }
  };

  return (
    <OuterBox>
      <Stack>
        {SIDEBAR.map((item) => (
          <StyleBox
            name={item.text}
            onClick={() => handleItemClick(item.text)}
            key={item.text}
          >
            <NavItem
              icon={item.icon}
              activeSrc={item.activeSrc}
              text={item.text}
              isActive={isActive === item.text}
            />
          </StyleBox>
        ))}
      </Stack>
      <Icon
        src={settings}
        height={theme.spacing(6)}
        width={theme.spacing(6)}
        alt={SIDEBAR[0].text}
      />
    </OuterBox>
  );
};

export default SideBar;
