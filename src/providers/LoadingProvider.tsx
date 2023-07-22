import React from 'react';

interface LoadingContextType {
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
  isLoading: boolean;
}
export const LoadingContext = React.createContext({} as LoadingContextType);
export const useLoadingContext = () => React.useContext(LoadingContext);
interface LoadingProviderProps {
  children: React.ReactNode;
}
export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
  const [isLoading, setLoading] = React.useState(false);

  const setLoadingTrue = () => {
    setLoading(true);
  }
  const setLoadingFalse = () => {
    setLoading(false);
  } 
  const context: LoadingContextType = {
    isLoading,
    setLoadingTrue,
    setLoadingFalse,
  }

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  )
}