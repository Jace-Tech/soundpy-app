/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
import React, { useEffect, useState } from 'react'
import useColorMode from '../../../../hooks/useColorMode'
import AppContainer from '../../../../components/global/AppContainer'
import { HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { RxCross1 } from 'react-icons/rx'
import { useGlobalContext } from '../../../../context'
import { convertNumber, getFileUrl } from '../../../../utils/helper'
import { FOOTER_WITH_IMAGE_CAP_HEIGHT } from '.'
import { BsSendFill } from 'react-icons/bs'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImageFooterProps {
  file: File;
  handleChangeState: (state: CurrentStateType) => void
}

const ImageFooter: React.FC<ImageFooterProps> = ({ file, handleChangeState }) => {
  const { colors, hoverColor } = useColorMode()
  const { setMainHeight } = useGlobalContext()
  const [image, setImage] = useState<string | null>(null)
  const { isOpen, onOpen, onClose, } = useDisclosure()
  const handleCancel = () => {
    setImage(null)
    handleChangeState("base")
  }

  useEffect(() => {
    (async () => {
      const data = await getFileUrl(file)
      setImage(data as string)
    })();
    setMainHeight(FOOTER_WITH_IMAGE_CAP_HEIGHT)
  }, [setMainHeight, file])

  const fileSizeDetails = file?.size && convertNumber(file.size)

  return (
    <AppContainer borderTop={`1px solid ${colors.DIVIDER}`} py={3}>
      <HStack flex={1} spacing={2} mb={2} alignItems={"center"} w={"100%"}>
        <IconButton
          size={"sm"}
          fontSize={"xl"}
          color={colors.TEXT_GRAY}
          onClick={handleCancel}
          isLoading={!image}
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          aria-label='camera'
          bg={"transparent"}
          icon={<RxCross1 />}
        />

        <Image onClick={onOpen} bg={hoverColor} src={image as string} alt="image" objectFit={"contain"} maxW={120} h={90} />

        <Stack spacing={0} flex={1}>
          <Text fontSize={"md"} maxW={"100%"} noOfLines={1} fontWeight={"semibold"} color={colors.TEXT_WHITE}>{file?.name}</Text>
          <Text fontSize={"sm"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{fileSizeDetails ? `${fileSizeDetails[0]}${fileSizeDetails[1]}` : ""}</Text>
        </Stack>
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
      <Modal isOpen={isOpen} size={"sm"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image onClick={onOpen} bg={hoverColor} src={image as string} alt="image" objectFit={"contain"} maxW={"full"}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AppContainer>
  )
}

export default ImageFooter