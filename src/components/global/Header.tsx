/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, BoxProps, HStack, Heading, IconButton, Spacer, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from "react-router-dom"
import { useAppSelector } from '../../store/hooks'
import { getSubName } from '../../utils/helper'
import { useDrawerContext } from '../../context/DrawerContext'
import { LuBell, LuSearch } from "react-icons/lu"
import { IoOptions } from "react-icons/io5"
import useColorMode from '../../hooks/useColorMode'
import { MAX_DEPTH } from '../../utils/constant'
import AppContainer from './AppContainer'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps extends BoxProps { }

const Header: React.FC<HeaderProps> = (props) => {
  const { onOpen } = useDrawerContext()
  const { user } = useAppSelector(state => state.userStore)
  const {colors} = useColorMode()
  
  return (
    <AppContainer py={2} zIndex={MAX_DEPTH / 2} {...(props as any)}>
      <HStack alignItems={"center"} >
        <HStack textAlign={"left"} as={"button"} onClick={onOpen}>
          <Avatar 
            src={user?.profileImage} size={"md"} 
            name={getSubName((user?.musicName || user?.username || "Jace Alex") as string)} 
          />
          <Stack spacing={-1}>
            <Text fontSize={"xs"} color={colors?.TEXT_GRAY}>Welcome Back!</Text>
            <Heading as={"h5"} fontSize={"sm"} color={colors?.TEXT_WHITE}>{user?.musicName || user?.username || "Jace Alex"}</Heading>
          </Stack>
        </HStack>

        <Spacer />

        <HStack>
          <IconButton 
            as={ReactLink}
            size={"md"}
            variant={""}
            fontSize={"xl"}
            aria-label='Search'
            color={colors?.TEXT_WHITE} 
            icon={<LuSearch/>} 
          />

          <IconButton 
            as={ReactLink}
            size={"md"}
            variant={""}
            fontSize={"xl"}
            aria-label='Notification'
            color={colors?.TEXT_WHITE} 
            icon={<LuBell/>} 
          />

          <IconButton 
            as={ReactLink}
            size={"md"}
            variant={""}
            fontSize={"xl"}
            aria-label='Filter'
            color={colors?.TEXT_WHITE} 
            icon={<IoOptions/>} 
          />
        </HStack>
      </HStack>
    </AppContainer>
  )
}

export default Header