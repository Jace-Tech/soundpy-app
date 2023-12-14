/* eslint-disable @typescript-eslint/no-empty-function */
import { Avatar, HStack, IconButton, Menu, MenuButton, MenuList, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useColorMode from '../../../../hooks/useColorMode';
import { IoEllipsisVertical } from 'react-icons/io5';
import ContentMenuItem from '../../../../components/local/ContentMenuItem';
import { BsFlagFill, BsMicMuteFill, BsPinAngleFill, BsTrashFill } from 'react-icons/bs';
import { SECONDARY_COLOR } from '../../../../utils/colors';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InboxCardProps {
  id?: string;
  username?: string;
  lastMessage?: string;
  date?: string;
  bordered?: boolean;
}

const InboxCard: React.FC<InboxCardProps> = ({ id, username, lastMessage, date, bordered }) => {
  const { colors, hoverColor } = useColorMode()
  console.log(id)
  return (
    <HStack _hover={{ bg: hoverColor }} borderTop={bordered ? `1px solid ${colors.DIVIDER}` : undefined} py={2}>
      <Avatar name={username?.slice(1) || "john doe"} size="lg" />
      <Stack spacing={0} flex={1} as={Link} to={`/chat/${username}`} >
        <Text fontSize={"md"} fontWeight={"semibold"} color={colors.TEXT_WHITE}>{username || "@Selebobo"}</Text>
        <Text fontSize={"md"} noOfLines={1} color={colors.TEXT_GRAY}>{ lastMessage || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}</Text>
      </Stack>

      <Stack alignItems={"flex-end"}>
        <Menu>
          <MenuButton
            as={IconButton}
            color={colors.TEXT_WHITE}
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
        <Text fontSize={"xs"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{ date || "07:23 pm"}</Text>
      </Stack>
    </HStack>
  )
}

export default InboxCard