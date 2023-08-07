import { Box } from '@mui/material';
import React from 'react';
interface  PageSpaceProps {
  children: React.ReactNode
}
export const PageSpacing: React.FC<PageSpaceProps> = ({children}) => {
  return (
    <Box ml={1} mr={1}>
      {children}
    </Box>
  )
}