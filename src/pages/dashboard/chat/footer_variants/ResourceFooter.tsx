import React, { useEffect } from 'react'
import AppContainer from '../../../../components/global/AppContainer'
import useColorMode from '../../../../hooks/useColorMode'
import { HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { BsSendFill } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { useGlobalContext } from '../../../../context';
import { FOOTER_WITH_RESOURCE_CAP_HEIGHT } from '.';
import ChatAudioPlayer from '../components/ChatAudioPlayer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResourceFooterProps { 
  resourceFile: Blob | null;
  setData: (file: Blob | null, type: CurrentStateType, state: CurrentStateType) => void;
}

const ResourceFooter: React.FC<ResourceFooterProps> = ({ resourceFile, setData }) => {
  const { colors } = useColorMode()
  const { setMainHeight } = useGlobalContext()

  useEffect(() => {
    setMainHeight(FOOTER_WITH_RESOURCE_CAP_HEIGHT)
  }, [setMainHeight])

  return (
    <AppContainer borderTop={`1px solid ${colors.DIVIDER}`} py={3}>
      <HStack flex={1} mb={2}>
        <ChatAudioPlayer file={resourceFile as Blob} />

        <IconButton
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          size={"sm"}
          fontSize={"lg"}
          onClick={() => {
            setData(null, "resource", "base")
          }}
          color={colors.TEXT_DARK}
          aria-label='camera'
          bg={"transparent"}
          icon={<RxCross1 />}
        />
      </HStack>

      <HStack alignItems={"center"} spacing={2}>
        <NumberInput flex={1} borderColor={colors.DIVIDER} min={0.000} precision={3} step={0.05}>
          <NumberInputField color={colors.TEXT_WHITE} placeholder='Set price or leave blank (for free)' _placeholder={{ color: colors.TEXT_DARK }} />
          <NumberInputStepper >
            <NumberIncrementStepper color={colors.TEXT_DARK} borderColor={colors.DIVIDER} />
            <NumberDecrementStepper color={colors.TEXT_DARK} borderColor={colors.DIVIDER} />
          </NumberInputStepper>
        </NumberInput>

        <HStack alignItems={"center"}>
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
        </HStack>
      </HStack>
    </AppContainer>
  )
}

export default ResourceFooter