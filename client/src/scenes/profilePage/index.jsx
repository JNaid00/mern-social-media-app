import React from "react";
import Navbar from "scenes/navbar";

import { useMediaQuery, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <div className={`w-full py-8 px-[6%] sm:flex block gap-8 justify-center`}>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
          <FriendListWidget userId={userId} homePage={false}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "55%"}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userId === _id && (<MyPostWidget picturePath={user.picturePath}/>)}
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </div>
    </div>
  );
};

export default ProfilePage;
