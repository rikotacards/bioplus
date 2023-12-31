import { Drawer} from "@mui/material";
import React from "react";
interface DrawerContextProps {
  onToggle: () => void;
  setComponentData:(data:Object) => void;
  setComponent: (componentName:string) => void;
}
import { PreviewDrawerContent } from "../components/PreviewDrawerContent/PreviewDrawerContent";
import { LinkThumbnailPanel } from "../components/LinkThumbnailPanel/LinkThumbnailPanel";
import { PublicProfileDrawerContent } from "../components/PublicProfileDrawerContent/PublicProfileDrawerContent";
import { PublicPreview } from "../components/PublicPreview/PublicPreview";
import { AddUrlDrawerContent } from "../AddUrlDrawerContent/AddUrlDrawerContent";
export const DrawerContext = React.createContext({} as DrawerContextProps);
export const useDrawerContext = () => React.useContext(DrawerContext);

interface DrawerProviderProps {
  children: React.ReactNode;
}

type ComponentDataType = {
  linkId?: string;
  username?: string;
}

const drawerStyles = {
  'paper': 'red'
};


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
    addLink: <AddUrlDrawerContent/>,
    preview: <PreviewDrawerContent/>,
    publicPreview: <PublicPreview/>,
    thumbnail: <LinkThumbnailPanel linkId={data?.linkId}/>,
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
        sx={{zIndex:'2000', width: '100%', flexDirection: 'column', alignItems: 'center' }}
        anchor="bottom"
        onClose={onToggle}
        open={open}
      >
        {drawerContent}
      </Drawer>
    </DrawerContext.Provider>
  );
};
