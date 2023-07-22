import React from'react'
import { useAuthContext } from './AuthProvider';
import { Link, deleteLinkNew, onSnapshotUser, updateLinksNew } from '../db/api';
interface LinksContextProps {
  links: Link[];
  onDeleteLink: (index: number) => void;
  onUpdateLink: (index: number, updatedLink: Link) => void;
  onAddLink:(link: Link) => void;
  onReorder: (links: Link[]) => void;
}

interface LinksProviderProps {
  children: React.ReactNode;
}
export const LinksContext = React.createContext({} as LinksContextProps);
export const useLinksContext = () => React.useContext(LinksContext);

export const LinksProvider: React.FC<LinksProviderProps> = ({children}) => {
  const auth = useAuthContext()
  const uid = auth?.user?.uid
  const [links, setLinks] = React.useState<Link[]>([])
  const set = (links: Link[]) => {
    setLinks(links)
  }
  
  React.useEffect(() => {
    if(auth?.user?.uid){
      return onSnapshotUser(uid ||"", set)

    }
  }, [auth?.user?.uid])

  const onDeleteLink = (index: number) => {
    if(!uid){
      return
    }
    deleteLinkNew(uid, index, links)
  }

  const onAddLink = (link: Link) => {
    if(!uid){
      return;
    }
    updateLinksNew(uid,[link, ...links])
  }

  const onUpdateLink = (index: number, updatedLink: Link) => {
    if(!uid){
      return;
    }
    links[index] = updatedLink
    updateLinksNew(uid,links)
  }
  const onReorder = (links: Link[]) => {
    if(!uid){
      return;
    }
    updateLinksNew(uid, links)
  }

  const context = {onReorder, onUpdateLink, links: links || [], onDeleteLink, onAddLink}
  return (
    <LinksContext.Provider value={context}>
    {children}
    </LinksContext.Provider>
  )
}