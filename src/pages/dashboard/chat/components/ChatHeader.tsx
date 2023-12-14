/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import AppBar from '../../../../components/global/AppBar'
import { Avatar, HStack, IconButton, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import useColorMode from '../../../../hooks/useColorMode'
import { IoEllipsisVertical } from 'react-icons/io5'
import ContentMenuItem from '../../../../components/local/ContentMenuItem'
import { BsFlagFill, BsMicMuteFill, BsPinAngleFill, BsTrashFill } from 'react-icons/bs'
import { SECONDARY_COLOR } from '../../../../utils/colors'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatHeaderProps { 
  username: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({username}) => {
  const { colors } = useColorMode()
  return (
    <AppBar
      page={username as string}
      bordered
      MiddleElement={
        <HStack spacing={3} flex={1} justifyContent={"center"}>
          <Avatar name={username?.slice(1)} size={"sm"} />
          <Text noOfLines={1} fontWeight={"bold"} letterSpacing={"wider"} color={colors.TEXT_WHITE} fontSize={".9rem"} textAlign={"center"}>{username}</Text>
        </HStack>
      }
      RightElement={
        <Menu>
          <MenuButton
            as={IconButton}
            color={colors.TEXT_GRAY}
            aria-label='Options'
            icon={<IoEllipsisVertical />}
            variant='link'
          />
          <MenuList shadow={"lg"} bg={colors.BG_COLOR} border={colors.TEXT_DARK}>
            <ContentMenuItem
              handleClick={() => { }}
              text={"Pin"}
              icon={<BsPinAngleFill size={20} />}
            />
            <ContentMenuItem
              bordered
              handleClick={() => { }}
              text={"Mute"}
              icon={<BsMicMuteFill size={20} />}
            />
            <ContentMenuItem
              bordered
              handleClick={() => { }}
              text={"Report"}
              icon={<BsFlagFill size={20} />}
            />
            <ContentMenuItem
              bordered
              handleClick={() => { }}
              text={"Delete"}
              icon={<BsTrashFill color={SECONDARY_COLOR} size={20} />}
            />
          </MenuList>
        </Menu>
      }
    />
  )
}

export default ChatHeader