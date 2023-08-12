import React from'react'
import { useAuthContext } from './AuthProvider';
import { Link, addLink, deleteLinkNew, getUidFromUsername, onSnapshotUser, updateLinksNew } from '../db/api';
import { mockLinks } from '../mocks/mockState.data';
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
    console.log('IN EFFECT LINKS PROVIDER', auth)
    if(!auth.username){
      return;
    }
    getUidFromUsername(auth?.username).then((res) => {
      console.log('getting links', res)
      setLinks(res.links)
    })
    if(!uid){
      return;
    }
    if(!auth.isLoggingIn && auth.isLoggedIn && auth?.user?.uid){
      console.log('GETTING SNAPSHOT')
      return onSnapshotUser(uid, set)
    }
    return () => {setLinks([])}
  }, [auth?.user?.uid, auth?.username])

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
    console.log('onReorder')
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