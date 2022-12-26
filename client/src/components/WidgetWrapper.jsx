import {  useTheme } from "@mui/material";

const WidgetWrapper = (props) => {
 
  const { palette } = useTheme();
  return (
    <div
      className={`px-7 pt-7 pb-2 ${
        palette.mode === "dark" ? "bg-dark-alt" : "bg-light-alt"
      } rounded-xl`}
    >
      {props.children}
    </div>
  );
};

export default WidgetWrapper;
