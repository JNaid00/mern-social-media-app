import { useTheme } from "@mui/material";

const WidgetWrapper = () => {
  const { palette } = useTheme();
  return (
    <div
      className={`px-7 pt-7 pb-2${
        palette.mode === "dark" ? "bg-dark-alt" : "bg-light-alt"
      } rounded-xl`}
    ></div>
  );
};

export default WidgetWrapper;
