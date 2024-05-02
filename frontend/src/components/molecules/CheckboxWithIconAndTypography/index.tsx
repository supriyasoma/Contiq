import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Checkbox from "../../atoms/CheckBox";
import fileIcon from "/public/assets/icons/fileBoxIcon.svg";
import theme from "../../../theme";
import IconWithTypography from "../IconWithTypography";
import MuiTypography from "../../atoms/Typograpy";
import { Icon } from "../../atoms/Icons";

interface Props {
  id: string;
  fileName: string;
  width: string;
  selected: boolean;
  onClick: () => void;
}

const CustomBox = styled(Box)(({ width }: { width: string }) => ({
  width: width,
  border: `0.0625rem solid ${theme.palette.grays.gray300}`,
  borderRadius: "0.25rem",
  background: theme.palette.grays.gray400,
  padding: "0.75rem 1.5rem 0.75rem 2.5rem",
}));

const CustomTypography = styled(MuiTypography)({
  color: theme.palette.text.white,
});

const CheckboxWithIconAndTypography = ({
  id,
  fileName,
  selected,
  onClick,
  width,
}: Props) => {
  return (
    <CustomBox width={width} id={id}>
      <Checkbox
        label={
          <IconWithTypography
            direction="row"
            gap="0.75rem"
            alignDirection="center"
            IconComponent={<Icon src={fileIcon} alt="Icon" />}
            TextComponent={
              <CustomTypography text={fileName} typoVariant="body1" />
            }
          />
        }
        checked={selected}
        onClick={onClick}
      />
    </CustomBox>
  );
};

export default CheckboxWithIconAndTypography;
