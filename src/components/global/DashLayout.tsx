import { Box, BoxProps, Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import useColorMode from '../../hooks/useColorMode';
import { useGlobalContext } from '../../context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashLayoutProps extends BoxProps {
  header?: React.ReactElement;
  footer?: React.ReactElement;
  hideFooter?: boolean;
  capHeight?: number;
} 

const DashLayout:React.FC<DashLayoutProps> = ({header, footer, children, hideFooter, capHeight, ...prop }) => {
  const { isDark } = useColorMode()
  const { mainHeight } = useGlobalContext()

  return (
    <Flex flexDir={"column"} minH={"100vh"}>
      { header }
      <Box 
        flex={1} 
        className={`scrollbar ${isDark ? 'dark' : ''}`}
        maxH={mainHeight ? `calc(100vh - ${mainHeight}px)` : capHeight ? `calc(100vh - ${capHeight}px)` : hideFooter? "calc(100vh - 70px)" : "calc(100vh - 125px)"}
        overflowY={"auto"} 
        overflowX={"hidden"}
        {...prop} 
      >
        { children }
      </Box>
     { footer ? footer : !hideFooter && <Footer />}
    </Flex>
  )
}

export default DashLayout