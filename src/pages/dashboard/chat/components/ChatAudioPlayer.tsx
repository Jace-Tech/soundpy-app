/* eslint-disable react-hooks/exhaustive-deps */
import { Circle, HStack, Icon, IconButton, Spacer, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import useColorMode from '../../../../hooks/useColorMode'
import { formatTime } from '../../../../utils/helper';
import { BsMusicNote, BsPauseFill, BsPlayFill } from 'react-icons/bs';
import useSimplePlayer from '../../../../hooks/useSimplePlayer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatAudioPlayerProps { 
  file?: Blob | File;
  fileDuration?: number;
  handleUpdate?: (player: any) => void;
}

const ChatAudioPlayer: React.FC<ChatAudioPlayerProps> = ({ file, fileDuration, handleUpdate }) => {
  const { colors, hoverColor } = useColorMode()
  const { load, isReady, playing, pause, play, duration, currentTime } = useSimplePlayer({ duration: fileDuration, handleUpdate })

  const loadFile = async () => {
    if(!file) return
    load(file)
  }

  useEffect(() => {
    loadFile()
  }, [file])

  return (
    <HStack bg={hoverColor} flex={1} rounded={"full"} p={2} px={4}>
      <IconButton
        _active={{ bg: "transparent" }}
        _hover={{ bg: "transparent" }}
        size={"sm"}
        fontSize={"2xl"}
        color={colors.TEXT_DARK}
        isLoading={!isReady}
        aria-label='camera'
        onClick={() => playing ? pause() : play()}
        bg={"transparent"}
        icon={playing ? <BsPauseFill /> : <BsPlayFill />}
      />

      <Spacer />

      <Text color={colors.TEXT_GRAY} fontWeight={"semibold"}>{`${currentTime} / ${duration === 0 ? `00:00` : formatTime(duration)}`}</Text>
      <Circle bg={colors.PRIMARY_COLOR} size={8} color={"#fff"}>
        <Icon aria-label="Music Icon" as={BsMusicNote} />
      </Circle>
    </HStack>
  )
}

export default ChatAudioPlayer