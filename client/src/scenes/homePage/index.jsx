import React from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <div>
      <Navbar />
      <UserWidget userId={user._id} picturePath={user.picturePath} />
      HomePage
    </div>
  );
};

export default HomePage;
