import React from 'react';

export const ModalContext = React.createContext({})
export const useModalContext = () => React.useContext(ModalContext)

export const ModalProvider: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClick = () => {
    setOpen(true)
  }
  const context = {

  }
  return (<>
  <ModalContext.Provider value={context}>
    

  </ModalContext.Provider>
  </>)
}