import React from "react";
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  Toolbar,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { addLink } from "../db/api";
import { useDrawerContext } from "../providers/DrawerProvider";
import { useAuthContext } from "../providers/AuthProvider";
import { useLinksContext } from "../providers/LinksProvider";
import { isValidUrl } from "../util/validateLink";
interface AddUrlDrawerContentProps {}
export const AddUrlDrawerContent: React.FC<AddUrlDrawerContentProps> = ({}) => {
  const linksContext = useLinksContext();
  const [url, setUrl] = React.useState("");
  const auth = useAuthContext();
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const onClose = () => {
    document.documentElement.scrollTo(0,0)
    setOpen(false);
  };
  const [hasError, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const uid = auth?.user?.uid;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setUrl(e.target.value.toLowerCase());
  };
  const onAdd = () => {
    setError(false);
    if (!uid) {
      return;
    }
    if (url.length === 0) {
      return;
    }
    if (!isValidUrl(url)) {
      setError(true);
      setErrorMessage("Url is not valid");
      return;
    }
    addLink({ title: "", link: url, isDisplayed: true, uid }).then((res) => {
      if (res) {
        linksContext.onAddLink({
          link: url,
          title: "",
          linkId: res,
          isDisplayed: true,
        });
      }
      onClose();
    
     
    });
    setUrl("");
  };

  return (
    <Collapse
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 16px",
      }}
      in={location.pathname === "/admin"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "4px",
          WebkitBorderTopRightRadius: "50px",
        }}
      >
        <Collapse in={open}>
          <Toolbar>
            <Typography sx={{textTransform: 'capitalize'}}>Add Url</Typography>
            <div style={{ marginLeft: "auto" }}>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
          <TextField
            name="url"
            fullWidth
            placeholder="www.myawesomesite.com"
            error={hasError}
            onChange={onChange}
            variant="outlined"
            value={url}
            type="url"
            autoComplete="off"
            helperText={errorMessage}
          />
        </Collapse>
        <Button
          size="large"
          fullWidth
          color={open ? "success" : undefined}
          onClick={open ? onAdd : toggle}
          sx={{textTransform: 'capitalize', mt: 1, borderRadius: "50px" }}
          variant={open ? "outlined" : "contained"}
        >
          {open ? "save?" : " Add Url"}
        </Button>
      </div>
    </Collapse>
  );
};
