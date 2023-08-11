import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
interface LoadingStatusAdormentsProps {
  error?: boolean;
  isLoading?: boolean;
  value?: string;
}
export const LoadingStatusAdorments: React.FC<LoadingStatusAdormentsProps> = ({isLoading, error, value}) => {
  console.log('e', value)
  if(error === undefined || isLoading == undefined){
    return null
  }
    if(error){
      return <InputAdornment position='end'><ErrorOutlineIcon color='error'/></InputAdornment>
    }
    if(isLoading){
      return (
        <InputAdornment position='end'><CircularProgress size={20}/></InputAdornment>
      )
    }
    if(!value){
      return
    }
    if(!error && !isLoading){
      console.log('cuess')
      return  <InputAdornment position='end'><CheckCircleIcon color='success'/></InputAdornment>
    }
  
}

export const TextFieldCustom: React.FC<TextFieldProps & {isLoading?: boolean, startAdornmentComponent?: React.ReactNode}> = (props) => {
console.log('textfield custom', props)
  

  return <TextField
  {...props}
  InputProps={{
    startAdornment: props.startAdornmentComponent,
    endAdornment: <LoadingStatusAdorments value={props.value} isLoading={props.isLoading} error={props.error}/>,
  }}/>
}