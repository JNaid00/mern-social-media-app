import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImage from "./UserImage";
import Tooltip from "@mui/material/Tooltip";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [test, settest] = useState(false);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // console.log(friends);
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    // console.log("Chaning friends");
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    // console.log(data)
    dispatch(setFriends({ friends: data }));
  };
  const userId = friendId;
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center gap-4">
        <UserImage image={userPicturePath} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${userId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </div>
      </div>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <Tooltip
            title={<Typography fontSize={15}>Remove Friend</Typography>}
            arrow
            leaveDelay={200}
            placement="top"
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </Tooltip>
        ) : (
          <Tooltip  title={<Typography fontSize={15}>Add Friend</Typography>} arrow leaveDelay={200} placement="top">
            <PersonAddOutlined sx={{ color: primaryDark }} />
          </Tooltip>
        )}
      </IconButton>
    </div>
  );
};

export default Friend;
