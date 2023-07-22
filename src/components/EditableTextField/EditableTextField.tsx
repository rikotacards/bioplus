import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import { useLinksContext } from '../../providers/LinksProvider';
interface EditableTextFieldProps {
  placeholder: string;
  fieldName: 'title' | 'link';
  index: number;
  onSave?: () => ((fieldName: string, text: string) => Promise<void>) | undefined
}
export const EditableTextField: React.FC<EditableTextFieldProps> = ({index,fieldName, placeholder, onSave}) => {
  const linksContext = useLinksContext();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('')
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }
  const newLink = {...linksContext.links[index]}
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const EditField = <div>
    <TextField 
    placeholder={placeholder} 
    value={text} 
    onChange={onChange} 
    size='small' variant='outlined'/>
    <Button  onClick={() => {
      toggleEdit();
      newLink[fieldName] = text || placeholder
      linksContext.onUpdateLink(index, newLink)
      setText('')
    }}
      sx={{textTransform:'capitalize'}}>Save</Button>
  </div>

  const displayed = <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={toggleEdit}>
    <Typography>{text || placeholder}</Typography><EditIcon sx={{ml:1}} onClick={toggleEdit} fontSize='small'/>
  </div>
  
  return (
    <div >
      {isEditing ? EditField: displayed}
    </div>
  )
}