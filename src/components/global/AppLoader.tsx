import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import Lottie from 'react-lottie';
import animationData from "../../assets/lotties/music-loader.json"
import { MAX_DEPTH } from '../../utils/constant';
import useColorMode from '../../hooks/useColorMode';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppLoaderProps { 
  hasBg?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ hasBg }) => {
  const {colors} = useColorMode()
  return (
    <Center bg={hasBg ? colors.BG_COLOR : "rgba(0, 0, 0, 0.75)"} h={"full"} w={"full"} top={0} left={0} position="fixed" zIndex={MAX_DEPTH}>
      <Box maxW={280}>
        <Lottie
          width={"100%"}
          height={"100%"}
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
        />
      </Box>
    </Center>
  )
}

export default AppLoader