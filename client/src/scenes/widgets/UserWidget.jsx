import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Typography, Divider, useTheme, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setuser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setuser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center gap-2 pb-[1.1rem]">
        <div className="flex justify-between items-center gap-4">
          <UserImage image={picturePath} />
          <div>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </div>
        </div>
        <IconButton>
          <ManageAccountsOutlined />
        </IconButton>
      </div>
      <Divider />
      <div className="py-4">
        <div className="flex items-center gap-4 mb-2">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </div>
        <div className="flex items-center gap-4">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </div>
      </div>

      <Divider />
      <div className="py-4">
        <div className="flex justify-between items-center mb-2 ">
          <Typography color={medium}>Who's viewed your profile: </Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-2 ">
          <Typography color={medium}>Impressions of your post:</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </div>
      </div>

      <Divider />
      <div className="py-4">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <div className="flex justify-between items-center gap-4 mb-2 ">
          <div className="flex justify-between items-center gap-4">
            <img src="../assets/twitter.png" alt="twitter"></img>
            <div>
              <Typography color={main} fontWeight="500">
                Twiiter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </div>
          </div>

          <EditOutlined sx={{ color: main }} />
        </div>
        <div className="flex justify-between items-center gap-4 mb-2 ">
          <div className="flex justify-between items-center gap-4">
            <img src="../assets/linkedin.png" alt="linkedin"></img>
            <div>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </div>
          </div>

          <EditOutlined sx={{ color: main }} />
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default UserWidget;
