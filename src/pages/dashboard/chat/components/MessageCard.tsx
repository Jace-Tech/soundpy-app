import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../../../hooks/useColorMode';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MessageCardProps {
  user?: boolean;
  isMedia?: boolean;
  isAudio?: boolean;
  message: string;
  date: string;
} 

const MessageCard:React.FC<MessageCardProps> = ({ user, date, message }) => {
  const { colors, hoverColor } = useColorMode()
  return (
    <Stack spacing={0} alignItems={user ? "flex-end" : "flex-start"}>
      <Text 
        py={2} 
        px={4} 
        rounded={"xl"} 
        roundedBottomRight={user ? 0 : "xl"}
        roundedBottomLeft={!user ? 0 : "xl"}
        maxW={280} 
        bg={user ? colors.PRIMARY_COLOR : hoverColor} color={user ? "#fff" : colors.TEXT_WHITE }>{message}</Text>
      <Text fontWeight={"semibold"} fontSize={"sm"} color={colors.TEXT_GRAY}>{date}</Text>
    </Stack>
  )
}

export default MessageCard