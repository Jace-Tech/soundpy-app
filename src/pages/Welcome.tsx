/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import React from 'react'
import AppContainer from '../components/global/AppContainer'
import { LOGO, WELCOME_BG_IMAGE } from '../assets'
import { WELCOME_TEXT } from '../contents/welcomePage'
import CustomButton from '../components/global/CustomButton'
import { useAppDispatch } from '../store/hooks'
import { loginSucess } from '../store/slices/userSlice'
import { useGlobalContext } from '../context'
import { APP_FIRST_TIME_USER, Storage } from '../utils/storage'
import { loginUser } from '../apis/auth'
import useAlert from '../hooks/useAlert'
import { incompletePayment } from '../apis/payment'


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WelcomeProps { }

const Welcome: React.FC<WelcomeProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, openLoading, closeLoading } = useGlobalContext()
  const { showAlert } = useAlert()

  const handleConnectAccount = async () => {
    try {
      openLoading()
      const result = await window?.Pi?.authenticate(["username", "payments"], (payment: PaymentDTO) => incompletePayment(payment))
      const authResult = await loginUser({
        user: {
          uid: result.user.uid,
          username: result.user.username
        },
        accessToken: result.accessToken
      })
      console.log("AUTH RES:", authResult)
      if (!authResult.success) throw new Error(authResult.message)
      dispatch(loginSucess(authResult.data as any))

      if (authResult.data?.isNew) {
        Storage.removeItem(APP_FIRST_TIME_USER)
      }

      const isFirstTime = Storage.getItem(APP_FIRST_TIME_USER)
      if (!isFirstTime) {
        navigate("/welcome")
        closeLoading()
        return
      }
      // NAVIGATE TO DASHBOARD
      navigate("/home")
    }
    catch (e: any) {
      console.log("ERROR [AUTH]:", e.message)
      showAlert(e.message, "error")
    }
    finally {
      closeLoading()
    }
  }

  const isNewUser = Boolean(Storage.getItem(APP_FIRST_TIME_USER))

  return (
    <AppContainer
      bg={`linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(0, 0, 0, .3), rgba(0, 0, 0, .95) 75%), url(${WELCOME_BG_IMAGE})`}
      bgSize={"cover"}
      bgPosition={"center"}
    >
      <Stack
        minH={"100vh"}
        flexDir={"column"}
        position={"relative"}
      >
        <Spacer />
        <Stack py={10} spacing={3} textAlign={"center"}>
          <Image src={LOGO} alt={"Logo"} maxW={170} mx={"auto"} />
          <Heading fontSize={"2rem"} fontWeight={"bold"} color={"white"} lineHeight={"1.3"}>Welcome to Soundpy</Heading>
          <Text fontSize={".9rem"} lineHeight={"1.7"} color={"gray.300"}>{WELCOME_TEXT}</Text>
          <CustomButton isLoading={isLoading} loadingText={"Loading"} onClick={handleConnectAccount} mt={8} size={"lg"} as={ReactLink}>
            {!isNewUser ? "Get Started" : "Welcome back"}
          </CustomButton>
        </Stack>
      </Stack>
    </AppContainer>
  )
}

export default Welcome