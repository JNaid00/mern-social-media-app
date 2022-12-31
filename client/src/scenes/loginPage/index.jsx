import { Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const alt = theme.palette.background.alt;
  console.log(alt);
  return (
    <div>
      <div
        className={`w-full py-4 px-[6%] text-center ${
          theme.palette.mode === "dark" ? "bg-dark-alt" : "bg-light-alt"
        }`}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
        Cyber Social
        </Typography>
      </div>

      <div
        className={`${
          isNonMobileScreens ? "w-1/2" : "w-[93%]"
        } p-8 my-8 mx-auto rounded-3xl space-y-4 ${
          theme.palette.mode === "dark" ? "bg-dark-alt" : "bg-light-alt"
        }`}
      >
        <Typography className="font-medium mb-6 text-center" variant="h3">
          Welcome to Cyber Social, the Social Media for Everyone!
        </Typography>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
