import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
const PostWidget = ({
  postId,
  postuserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setisComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const isLiked = Boolean(likes[loggedInUserId]);

  const likeCOunt = Object.keys(likes).length;
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;
  const patchLike = async () => {
    
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postuserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      ></Friend>

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          className="w-full h-auto rounded-xl mt-3"
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="post"
        />
      )}

      <div className="flex justify-between items-center mt-1">
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-1">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCOunt}</Typography>
          </div>

          <div className="flex justify-between items-center gap-1">
            <IconButton onClick={() => setisComments(isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </div>
        </div>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </div>

      {isComments && (
        <div className="mt-2">
          {comments.map((comment, index) => (
            <div key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </div>
          ))}
          <Divider />
        </div>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
