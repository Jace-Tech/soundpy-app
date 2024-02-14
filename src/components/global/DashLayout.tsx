import { Alert, AlertIcon, Box, BoxProps, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom';
import Footer from './Footer'
import useColorMode from '../../hooks/useColorMode';
import { useGlobalContext } from '../../context';
import { useAppSelector } from '../../store/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashLayoutProps extends BoxProps {
  header?: React.ReactElement;
  footer?: React.ReactElement;
  hideFooter?: boolean;
  capHeight?: number;
  handleRefresh?: () => void;
} 

const DashLayout:React.FC<DashLayoutProps> = ({header, handleRefresh, footer, children, hideFooter, capHeight, ...prop }) => {
  const { isDark } = useColorMode()
  const { mainHeight } = useGlobalContext()
  const user = useAppSelector(state => state.userStore.user)

  return (
    <Flex flexDir={"column"} minH={"100vh"}>
      { header }
      {!user?.musicName && (
          <Alert fontSize={"sm"} status='info' variant='subtle'>
          <AlertIcon />
            Please complete your profile. <Link to={"/profile/settings"} ml={1} color={"blue.500"} as={ReactLink}>click here</Link>
        </Alert>
        )}
      <Box  
        id='main-body'
        flex={1} 
        className={`scrollbar ${isDark ? 'dark' : ''}`}
        maxH={mainHeight ? `calc(100vh - ${mainHeight}px)` : capHeight ? `calc(100vh - ${capHeight}px)` : hideFooter? "calc(100vh - 70px)" : "calc(100vh - 125px)"}
        overflowY={"auto"} 
        overflowX={"hidden"}
        {...prop} 
      >
        { children }
      </Box>
     { footer ? footer : !hideFooter && <Footer handleRefresh={handleRefresh} />}
    </Flex>
  )
}

export default DashLayout