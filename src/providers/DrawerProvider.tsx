import { Drawer, Fab, Paper } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
interface DrawerContextProps {
  onToggle: () => void;
  setComponentData:(data:Object) => void;
  setComponent: (componentName:string) => void;
}
import { Preview } from "../components/Preview/Preview";
import { PreviewDrawerContent } from "../components/PreviewDrawerContent/PreviewDrawerContent";
import { LinkThumbnailPanel } from "../components/LinkThumbnailPanel/LinkThumbnailPanel";
import { PublicProfileDrawerContent } from "../components/PublicProfileDrawerContent/PublicProfileDrawerContent";
export const DrawerContext = React.createContext({} as DrawerContextProps);
export const useDrawerContext = () => React.useContext(DrawerContext);

interface DrawerProviderProps {
  children: React.ReactNode;
}

type ComponentDataType = {
  linkId?: string;
  username?: string;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [componentName, setComponentName] = React.useState("")
  const [data, setData] = React.useState({} as ComponentDataType )
  const setComponent = (componentName: string) => {
    setComponentName(componentName)
  }
  const setComponentData = (data: Object) => {
    setData(data)
  }
  const onToggle = () => {
    setOpen(!open);
  };

  const drawerComponents = {
    preview: <PreviewDrawerContent/>,
    thumbnail: <LinkThumbnailPanel linkId={data?.linkId}/>,
    more: <PublicProfileDrawerContent username={data?.username}/>
  }
  const drawerContent = drawerComponents[componentName]


  const context = {
    onToggle,
    setComponent,
    setComponentData
  };
  return (
    <DrawerContext.Provider value={context}>
      {props.children}
      <Drawer
        sx={{width: '100%', flexDirection: 'column', display: "flex", alignItems: 'center' }}
        anchor="bottom"
        onClose={onToggle}
        open={open}
      >
        {drawerContent}
      </Drawer>
    </DrawerContext.Provider>
  );
};
