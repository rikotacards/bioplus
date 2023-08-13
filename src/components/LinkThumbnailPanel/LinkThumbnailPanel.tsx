import React from "react";
import {
  deleteImage,
  getImagePath,
  updateLink,
  uploadImage,
} from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from "@mui/material";
interface LinkThumbnailPanelProps {
  linkId: string | undefined;
}
export const LinkThumbnailPanel: React.FC<LinkThumbnailPanelProps> = ({
  linkId,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const auth = useAuthContext();

  const uid = auth.user?.uid;
  const path = `${uid}/linkThumbnails/${linkId}.jpg`;
  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };
  const [localImagePath, setLocalImagePath] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      console.log("set");
      return;
    }
    getImagePath(path)
      .then((res) => {
        if (res) {
          setLocalImagePath(res);
          setLoading(false);
        }
        setLoading(false);
      })
      .then(() => setLoading(false))
      .catch((e) => setLoading(false));
  }, [uid]);
  const onDelete = () => {
    setLocalImagePath("");
    deleteImage({ path });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) {
      return;
    }
    if (!uid) {
      return;
    }
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (!e?.target) {
        return;
      }
      setLocalImagePath(() => e.target?.result as string);
      uploadImage({ path, file: e.target?.result as string }).then(() => {
        setLoading(false);
      });
    };
  };
  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    
      }}
    >
      <Toolbar>
        <Typography fontWeight={"bold"} variant="body1">
          Upload link thumbnail
        </Typography>
      </Toolbar>
      <Box
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "100px",
          height: "100px",
          overflow: "hidden",
          margin: "4px",

          justifyContent: "center",
          borderRadius: "5px",
        }}
        border={1}
      >
        {!isLoading && !localImagePath && <ImageIcon />}
        {isLoading && <CircularProgress />}
        {!isLoading && localImagePath && (
          <img
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            src={localImagePath}
          />
        )}
      </Box>
      <input
        accept="image/*"
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <div>
        {!!localImagePath.length && (
          <Button
            disabled={!localImagePath.length}
            onClick={onDelete}
            fullWidth
            sx={{mt:1}}
            variant="contained"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
