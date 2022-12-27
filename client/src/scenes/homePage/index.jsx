import React from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <div>
      <Navbar />
      <div
        className={`w-full py-8 px-[6%] sm:flex block gap-2 justify-between`}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "55%"}
          mt={isNonMobileScreens ? undefined : "2rem"}
         
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id}/>
        </Box>

        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </div>
    </div>
  );
};

export default HomePage;
