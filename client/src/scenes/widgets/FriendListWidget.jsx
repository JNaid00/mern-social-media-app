import React from "react";
import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

import Friend from "components/Friend";
import { useNavigate } from "react-router-dom";
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getAllFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getAllFriends();
  }, []);

    console.log(friends);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <div className="flex flex-col gap-6">
        {friends.map((item, index) => (
          <Friend
            key={`${item._id}`}
            friendId={item._id}
            name={`${item.firstName} ${item.lastName}`}
            subtitle={item.occupation}
            userPicturePath={item.picturePath}
          ></Friend>
        ))}
      </div>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
