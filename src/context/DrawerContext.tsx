
import React, { createContext, ReactNode, useContext } from "react";
import DrawerLayout from "../components/global/DrawerLayout";
import { Box, useDisclosure } from "@chakra-ui/react";

interface DrawerContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const DrawerContext = createContext({} as DrawerContextProps);

interface DrawerContextProviderProps {
  children: ReactNode;
}

const DrawerContextProvider: React.FC<DrawerContextProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
      <Box>
        {children}
        <DrawerLayout
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </DrawerContext.Provider>
  )
}

export default DrawerContextProvider


export const useDrawerContext = () => useContext(DrawerContext);