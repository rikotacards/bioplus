import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
interface EditableTextFieldProps {
  placeholder?: string;
  onDone?: () => {};
}
export const EditableTextField: React.FC<EditableTextFieldProps> = ({placeholder}) => {
  
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('')
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const EditField = <div>
    <TextField placeholder={placeholder} value={text} onChange={onChange} size='small' variant='outlined'/><Button onClick={toggleEdit} sx={{textTransform:'capitalize'}}>Done</Button>
  </div>

  const displayed = <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={toggleEdit}>
    <Typography>{text || placeholder}</Typography><EditIcon onClick={toggleEdit} fontSize='small'/>
  </div>
  
  return (
    <div >
      {isEditing ? EditField: displayed}
    </div>
  )
}