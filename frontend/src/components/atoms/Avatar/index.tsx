import React from "react";
import { Avatar as MuiAvatar, AvatarProps } from "@mui/material";

export interface MuiAvatarProps extends AvatarProps {}

const Avatar = (muiAvatarProps: MuiAvatarProps) => {
  return <MuiAvatar {...muiAvatarProps} />;
};

export default Avatar;
