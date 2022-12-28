import React from "react";
import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center">
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Creat Ad</Typography>
      </div>
      <img
        className="w-full h-auto max-h-[400px] rounded-xl my-3"
        src="http://localhost:3001/assets/info2.jpeg"
        alt="advert"
      />

      <div className="flex justify-between items-center">
        <Typography color={main}>KFC</Typography>
        <Typography color={medium}>KFC.com</Typography>
      </div>
      <Typography color={medium} m="0.5rem 0">
        No more simple cheeseburgers (although those are yummy too).
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
