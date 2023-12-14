import React, { createContext, ReactNode, useContext, useState } from "react";
import DrawerContextProvider from "./DrawerContext";
import { useDisclosure } from "@chakra-ui/react";
import AppLoader from "../components/global/AppLoader";
// import { useAppDispatch } from "../store/hooks";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GlobalContextProps {
  isLoading: boolean;
  openLoading: () => void;
  closeLoading: () => void;
  scrollY: number;
  setScrollY: (num: number) => void;
  mainHeight: number | null;
  setMainHeight: (value: number | null) => void;
}
const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const [scrollY, setScrollY] = useState<number>(0)
  const [mainHeight, setMainHeight] = useState<number | null>(null)
  
  return (
    <GlobalContext.Provider value={{ closeLoading, isLoading, openLoading, scrollY, setScrollY, mainHeight, setMainHeight }}>
      <DrawerContextProvider>
        {children}
      </DrawerContextProvider>
      {isLoading && <AppLoader />}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

export const useGlobalContext = () => useContext(GlobalContext);