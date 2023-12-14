/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import { Button, Card, CardBody, HStack, Heading, IconButton, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import useColorMode from '../../../hooks/useColorMode'
import AppContainer from '../../../components/global/AppContainer'
import CustomButton from '../../../components/global/CustomButton'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import TransactionCard from './components/TransactionCard'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeAmountMode } from '../../../store/slices/settingsSlice'
import { LINE } from '../../../assets'
import { WALLET_CAP_HEIGHT } from '../../../utils/constant'
// import { getUsersTransactions } from '../../../apis/transactions'
// import usePagination from '../../../hooks/usePagination'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps { }

const Wallet: React.FC<WalletProps> = () => {
  const { colors } = useColorMode()
  const { hideAmount } = useAppSelector(state => state.settingStore)
  const dispatch = useAppDispatch()

  // const token = useAppSelector(state => state.userStore.token)
  // const { data, handleFetchRequest, } = usePagination((page, perPage, filter) => getUsersTransactions(token!.token, page, perPage, filter))
  // const [transactions, setTransactions] = useState<TransactionDataType[]>([])

  // useEffect(() => {
  //   setTransactions(data)
  //   console.log("DATA [TRAN]:", data)
  // }, [data])

  
  
  return (
    <DashLayout
      hideFooter
      capHeight={WALLET_CAP_HEIGHT}
      header={ 
        <Stack>
          <AppBar bordered page='Wallet & Transaction' hasSearch />

          <AppContainer 
            py={4} 
          >
            <Card shadow={"xl"} bgColor={`hsl(178, 23%, 30%)`} overflow={"hidden"}>
              <CardBody pos={"relative"}>
                <Image src={LINE} pos={"absolute"} left={0} top={0} objectFit={"cover"} bgPos={"center center"} w={"full"} h={"full"} />
                <HStack pos={"relative"}>
                  <Stack spacing={0}>
                    <Text color={"#eee"} textTransform={"uppercase"} fontSize={"sm"} letterSpacing={"wider"} fontWeight={"extrabold"}>Balance</Text>
                    <Heading filter={hideAmount ? "blur(5px)" : undefined} color={"#fff"}>10.593π</Heading>
                  </Stack>

                  <Spacer />

                  <IconButton
                    size={"sm"}
                    color={"#eee"}
                    fontSize={"xl"}
                    variant={"unstyled"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                    onClick={() => dispatch(changeAmountMode(!hideAmount as any))}
                    colorScheme='gray'
                    aria-label='toggle'
                    icon={!hideAmount ? <IoIosEyeOff /> : <IoIosEye />}
                  />
                </HStack>
              </CardBody>
              <CustomButton borderTopRadius={"none"} w={"full"}>Withdraw</CustomButton>
            </Card>

            <HStack pt={6}>
              <Heading color={colors.TEXT_GRAY} size={"sm"}>Recent Transactions</Heading>
              <Spacer />
              <Button fontSize={"sm"} variant={"link"} color={colors.PRIMARY_COLOR}>Claim all</Button>
            </HStack>
          </AppContainer>
        </Stack>
      }>
      <AppContainer pb={10} pt={4}>
        <Stack spacing={4}>
          <TransactionCard
            outgoing
            title='Technocrat'
            price='0.34'
          />
          <TransactionCard
            outgoing
            title='Monalisa'
            price='0.50'
          />
          <TransactionCard claimed />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </Stack>
      </AppContainer>
    </DashLayout>
  )
}

export default Wallet