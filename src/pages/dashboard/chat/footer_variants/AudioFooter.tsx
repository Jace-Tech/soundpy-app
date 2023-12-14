/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AppContainer from '../../../../components/global/AppContainer'
import useColorMode from '../../../../hooks/useColorMode'
import { Circle, HStack, Icon, IconButton, Spacer, Text } from '@chakra-ui/react'
import { BsMicFill, BsPauseFill, BsPlayFill, BsSendFill, BsStopFill, BsTrashFill } from 'react-icons/bs';
import { useGlobalContext } from '../../../../context';
import { FOOTER_WITH_AUDIO_CAP_HEIGHT } from '.';
import useRecord from '../../../../hooks/useRecord';
import ChatAudioPlayer from '../components/ChatAudioPlayer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AudioFooterProps {
  handleChangeState: (state: CurrentStateType) => void;
  setData: (file: Blob | null, type: CurrentStateType, state: CurrentStateType) => void;
}

const AudioFooter: React.FC<AudioFooterProps> = ({ handleChangeState }) => {
  const { colors, hoverColor } = useColorMode()
  const { setMainHeight } = useGlobalContext()
  // const { load, play, pause, isReady, playing, duration } = useAudioPlayer()
  const { deleteRecord, hasStopped, startRecord, isRecording, pauseRecord, recorder, resumeRecord, stopRecord, timer, audio } = useRecord()

  useEffect(() => {
    setMainHeight(FOOTER_WITH_AUDIO_CAP_HEIGHT)
  }, [])

  const handleDeleteRecord = () => {
    deleteRecord()
    handleChangeState("base")
  }

  useEffect(() => {
    if (!recorder && !isRecording) return
    startRecord()
  }, [recorder])

  const duration = (timer.minutes * 60 + timer.seconds) - 1
  return (
    <AppContainer borderTop={`1px solid ${colors.DIVIDER}`} py={3}>
      <HStack flex={1} mb={2} alignItems={"center"}>
        <IconButton
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          size={"sm"}
          fontSize={"lg"}
          onClick={handleDeleteRecord}
          color={colors.TEXT_DARK}
          aria-label='camera'
          bg={"transparent"}
          icon={<BsTrashFill />}
        />

        {!hasStopped ? (
          <HStack alignItems={"center"} flex={1}>
            <HStack bg={hoverColor} flex={1} rounded={"full"} p={2} px={4}>
              <IconButton
                _active={{ bg: "transparent" }}
                _hover={{ bg: "transparent" }}
                size={"sm"}
                fontSize={"2xl"}
                color={colors.TEXT_DARK}
                isLoading={!recorder}
                aria-label='camera'
                onClick={() => isRecording ? pauseRecord() : resumeRecord()}
                bg={"transparent"}
                icon={isRecording ? <BsPauseFill /> : <BsPlayFill />}
              />

              <Spacer />

              <Text color={colors.TEXT_GRAY} fontWeight={"semibold"}>
                {`${timer.minutes.toString().padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`}
              </Text>
              <Circle bg={colors.PRIMARY_COLOR} size={8} color={"#fff"}>
                <Icon aria-label="Music Icon" as={BsMicFill} />
              </Circle>
            </HStack>

            <IconButton
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              size={"sm"}
              fontSize={"2xl"}
              color={colors.SECONDARY_COLOR}
              aria-label='camera'
              onClick={stopRecord}
              bg={"transparent"}
              icon={<BsStopFill />}
            />
          </HStack>
        ) : (
          <ChatAudioPlayer 
            fileDuration={duration} 
            file={audio as Blob} 
          />
        )}
        {hasStopped && (<IconButton
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          size={"sm"}
          fontSize={"2xl"}
          color={colors.PRIMARY_COLOR}
          aria-label='camera'
          bg={"transparent"}
          icon={<BsSendFill />}
        />)
        }
      </HStack>
    </AppContainer>
  )
}

export default AudioFooter