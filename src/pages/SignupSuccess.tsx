import React, { useEffect } from 'react'
import AppContainer from '../components/global/AppContainer'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Lottie from 'react-lottie'
import { SUCCESS_LOTTIE } from '../assets'
import CustomButton from '../components/global/CustomButton'
import { useNavigate } from 'react-router-dom'
import { APP_FIRST_TIME_USER, Storage } from '../utils/storage'
import useColorMode from '../hooks/useColorMode'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SignupSuccessProps { }

const SignupSuccess: React.FC<SignupSuccessProps> = () => {
  const navigate = useNavigate()

  const { colors } = useColorMode()

  useEffect(() => {
    Storage.setItem(APP_FIRST_TIME_USER, "false")
  }, [])
  
  return (
    <AppContainer h={"100vh"} py={4} display={"flex"}>
      <Stack h={"100%"}>
        <Center mt={10}>
          <Lottie 
            options={{
              animationData: SUCCESS_LOTTIE,
              loop: true,
              autoplay: true
            }}
            width={300}
          />
        </Center>

        <Stack spacing={4} textAlign={"center"} flex={1} pb={10} justifyContent={"flex-end"}>
          <Heading color={colors.TEXT_WHITE}>Welcome Aboard! 🎉</Heading>
          <Text color={colors.TEXT_DARK}>Click on continue to proceed with profile setup. This won't take long</Text>
          <CustomButton onClick={() => navigate("/profile/settings", { replace: true })} mt={10} size={"lg"}>Continue</CustomButton>
        </Stack>
      </Stack>
    </AppContainer>
  )
}

export default SignupSuccess