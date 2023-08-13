import {
 
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLinksContext } from "../../providers/LinksProvider";
interface EditableTextFieldProps {
  placeholder: string;
  fieldName: "title" | "link";
  index: number;
  textValue?: string;
  onSave?: () =>
    | ((fieldName: string, text: string) => Promise<void>)
    | undefined;
}
export const EditableTextField: React.FC<EditableTextFieldProps> = ({
  index,
  fieldName,
  placeholder,
  textValue = ""
}) => {
  const linksContext = useLinksContext();
  const [text, setText] = React.useState<string>("");
  React.useEffect(() => {
    setText(textValue)
  }, [textValue])
  const [showClear, setShowClear] = React.useState(false);
  const toggleShowClear = (set: boolean) => {
    setShowClear(set);
  };

  const newLink = { ...linksContext.links[index] };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = fieldName==='link' ? e.target.value.toLowerCase() : e.target.value;
    setText(value)
  };

  const EditField = (
    <TextField
      sx={{ mb: 0.5 }}
      fullWidth
      onFocus={() => {
        toggleShowClear(true);
      }}
      InputProps={{
        endAdornment: !false ? null : (
          <InputAdornment  position="end">
            <IconButton onClick={()=>{setText('')}}>

            <CancelIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onBlur={() => {
        newLink[fieldName] = text
        linksContext.onUpdateLink(index, newLink);
        toggleShowClear(false);
      }}
      placeholder={placeholder}
      value={text}
      onChange={onChange}
      size="small"
      variant="outlined"
    />
  );

  return <div style={{ display: "flex", width: "100%" }}>{EditField}</div>;
};
