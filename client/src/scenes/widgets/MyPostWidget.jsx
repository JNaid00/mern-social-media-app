import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setisImage] = useState(false);
  const [image, setimage] = useState(null);
  const [post, setpost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setimage(null);
    setPost("");
  };

  const border = "border-2 border-[" + medium + "]";
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center gap-6 ">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What is in your mind"
          onChange={(e) => setpost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </div>

      {isImage && (
        <div className={`rounded-md ${border} mt-4 p-2`}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setimage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex justify-between items-center">
                {" "}
                <div
                  {...getRootProps()}
                  className={`p-4 cursor-pointer border-2 border-solid border-blue-400 w-full`}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image here</p>
                  ) : (
                    <div className="flex justify-between items-center">
                      {image.name}
                      <EditOutlined />
                    </div>
                  )}
                </div>
                {image && (
                  <IconButton
                    onClick={() => setimage(null)}
                    sx={{ paddingLeft: "10px" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <div className="flex justify-between items-center">
        <div
          className="flex justify-between items-center gap-1"
          onClick={() => setisImage(!isImage)}
        >
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </div>

        {isNonMobileScreens ? (
          <>
            <div className="flex justify-between items-center gap-1">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </div>
            <div className="flex justify-between items-center gap-1">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </div>
            <div className="flex justify-between items-center gap-1">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </div>
          </>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </div>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
