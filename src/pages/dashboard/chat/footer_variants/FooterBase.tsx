/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AppContainer from '../../../../components/global/AppContainer'
import { HStack, IconButton, Textarea } from '@chakra-ui/react'
import useColorMode from '../../../../hooks/useColorMode'
import { RxCross1 } from 'react-icons/rx';
import { BsCameraFill, BsMicFill, BsSendFill, BsSoundwave } from 'react-icons/bs';
import useFilePicker from '../../../../hooks/useFilePicker';
import { useGlobalContext } from '../../../../context';
import { DEFAULT_FOOTER_CAP_HEIGHT } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterBaseProps {
  handleChangeState: (state: CurrentStateType) => void;
  setData: (file: Blob, type: CurrentStateType, state: CurrentStateType) => void;
} 

const FooterBase:React.FC<FooterBaseProps> = ({ setData, handleChangeState }) => {
  const { setMainHeight } = useGlobalContext()
  const [isTexting, setIsTexting] = useState<boolean>(false)
  const { colors } = useColorMode()
  const {  handleOpenFilePicker: openResource } = useFilePicker([".flag", ".ogg", ".wav", ".mp3"])
  const {  handleOpenFilePicker: openCamera, file } = useFilePicker(["image/*"])
  
  useEffect(() => {
    setMainHeight(DEFAULT_FOOTER_CAP_HEIGHT)
  }, [setMainHeight])

  useEffect(() => {
    if(!file) return
    setData(file, "camera", "camera")
  }, [file])

  return (
    <AppContainer borderTop={`1px solid ${colors.DIVIDER}`} py={3}>
      <HStack alignItems={"center"} spacing={2}>
        {isTexting ? (
          <IconButton
            size={"sm"}
            fontSize={"xl"}
            color={colors.TEXT_GRAY}
            onClick={() => setIsTexting(false)}
            _active={{ bg: "transparent" }}
            _hover={{ bg: "transparent" }}
            aria-label='camera'
            bg={"transparent"}
            icon={<RxCross1 />}
          />
        ) : (
          <HStack alignItems={"center"} spacing={3}>
            <IconButton
              size={"sm"}
              fontSize={"2xl"}
              color={colors.TEXT_GRAY}
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              aria-label='camera'
              onClick={() => openCamera()}
              bg={"transparent"}
              icon={<BsCameraFill />}
            />

            <IconButton
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              size={"sm"}
              fontSize={"xl"}
              color={colors.TEXT_GRAY}
              aria-label='camera'
              onClick={() => handleChangeState("record")}
              bg={"transparent"}
              icon={<BsMicFill />}
            />
          </HStack>
        )}

        <Textarea
          rows={1}
          onFocus={() => setIsTexting(true)}
          isRequired
          placeholder='Start negotiating'
          _placeholder={{ color: colors.TEXT_DARK }}
          borderColor={colors.DIVIDER}
          color={colors.TEXT_WHITE}
        />

        <HStack alignItems={"center"}>
          {isTexting ? (
            <IconButton
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              size={"sm"}
              fontSize={"2xl"}
              color={colors.PRIMARY_COLOR}
              aria-label='camera'
              bg={"transparent"}
              icon={<BsSendFill />}
            />
          ) : (
            <IconButton
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              size={"sm"}
              fontSize={"2xl"}
              color={colors.PRIMARY_COLOR}
              aria-label='camera'
              bg={"transparent"}
              onClick={() => openResource((file) => setData(file, "resource", "resource"))}
              icon={<BsSoundwave />}
            />
          )}
        </HStack>
      </HStack>
    </AppContainer>
  )
}

export default FooterBase