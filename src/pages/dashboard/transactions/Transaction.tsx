/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import { Center, CircularProgress, HStack, Icon, IconButton, Input, InputGroup, InputRightElement, Stack, useDisclosure } from '@chakra-ui/react'
import useColorMode from '../../../hooks/useColorMode'
import AppContainer from '../../../components/global/AppContainer'
import TransactionCard from './components/TransactionCard'
import { useAppSelector } from '../../../store/hooks'
import { getUsersTransactions } from '../../../apis/transactions'
import usePagination from '../../../hooks/usePagination'
import { IoFilterOutline } from 'react-icons/io5'
import CustomButton from '../../../components/global/CustomButton'
import TransactionFilter from './components/TransactionFilter'
import { RxCross1 } from 'react-icons/rx'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps { }

const Wallet: React.FC<WalletProps> = () => {
  const { colors } = useColorMode()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const token = useAppSelector(state => state.userStore.token)
  const { data, handleFetchRequest, page, perPage, isLoading, handleFilterRequest } = usePagination((page, perPage, filter) => getUsersTransactions(token!.token, page, perPage, filter))
  const [transactions, setTransactions] = useState<TransactionDataType[]>([])
  const inputRef = useRef<HTMLInputElement>()
  const { isOpen: isSearched, onOpen: openSearch, onClose: closeSearch } = useDisclosure()
  
  const handleSearch = async () => {
    const search = inputRef.current.value.trim()
    if(!search) return
    await handleFilterRequest(`search=${search}`)
    openSearch()
  }

  const handloCloseSearch = async () => {
    inputRef.current.value = ""
    await handleFetchRequest(page, perPage)
    closeSearch()
  }

  useEffect(() => {
    setTransactions(data)
    console.log("DATA [TRAN]:", data)
  }, [data])



  return (
    <DashLayout
      hideFooter
      capHeight={135}
      header={
        <Stack>
          <AppBar bordered page='Transactions' RightElement={
            <IconButton
              aria-label='back'
              size={"sm"}
              _hover={{ bg: "transparent" }}
              color={colors.TEXT_GRAY}
              fontSize={"xl"}
              onClick={onOpen}
              variant={"ghost"}
              icon={<IoFilterOutline />}
            />
          } />
          <AppContainer
            py={4}
          >
            <InputGroup>
              <Input ref={inputRef} rounded={"lg"} placeholder='Search desc' color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"} />
              <InputRightElement w={"fit-content"}>
                <HStack spacing={0}>
                  { isSearched && <IconButton onClick={handloCloseSearch} bg={"transparent"} variant={"link"} aria-label='clear' rounded={0} icon={<Icon as={RxCross1} />} />}
                  <CustomButton onClick={handleSearch} roundedLeft={0}>Search</CustomButton>
                </HStack>
              </InputRightElement>
            </InputGroup>

          </AppContainer>
        </Stack>
      }>
      <AppContainer pb={10} pt={4}>
        <Stack spacing={4}>
          {isLoading ? (
            <Center>
              <CircularProgress isIndeterminate color='gray.400' size={8} />
            </Center>
          ) : transactions.length ? transactions.map(trx => <TransactionCard key={trx._id} {...trx} />) : (
            <Center fontSize={"sm"} color={colors.TEXT_GRAY} pt={8}>No transactions</Center>
          )}
        </Stack>
      </AppContainer>

      <TransactionFilter 
        isOpen={isOpen} 
        onClose={onClose} 
        onOpen={onOpen} 
        handleReset={() => handleFetchRequest(page, perPage)} 
        isLoading={isLoading}
        handleApply={async (search) => await handleFilterRequest(search)} 
      />
    </DashLayout>
  )
}

export default Wallet