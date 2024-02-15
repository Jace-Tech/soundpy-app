/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import { Checkbox, HStack, Heading, Link, Stack, Text, VStack, Highlight, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure, DrawerFooter } from '@chakra-ui/react'
import useColorMode from '../../../hooks/useColorMode'
import { useUploadContext } from '../../../context/UploadContext'
import AppContainer from '../../../components/global/AppContainer'
import { Link as ReactLink } from "react-router-dom"
import UploadItem from './components/UploadItem'
// import { getSlug } from '../../../utils/helper'
import { GiMusicalNotes } from "react-icons/gi"
import { TbActivityHeartbeat } from "react-icons/tb"
import { IoVideocam } from "react-icons/io5"
import CustomButton from '../../../components/global/CustomButton'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UploadProps { }

const Upload: React.FC<UploadProps> = () => {
  const { colors } = useColorMode()
  const { toggleAgreed, agreed, setContentType, contentType, handleOpenFilePicker } = useUploadContext()
  const { isOpen, onClose, onOpen  } = useDisclosure()


  useEffect(() => {
    if(agreed) return
    if(!contentType) onClose();
    else onOpen()
  }, [contentType, onClose, agreed, onOpen])
  return (
    <DashLayout
      hideFooter
      header={<AppBar
        borderBottomWidth={1}
        borderColor={colors.DIVIDER}
        page='Upload'
      />}
    >
      <AppContainer py={8}>
        <VStack>
          <VStack spacing={1}>
            <Heading size={"lg"} color={colors.TEXT_WHITE}>Select your music type</Heading>
            <Text fontSize={"sm"} color={colors.TEXT_GRAY}>Tap on of the list to browse your file.</Text>
            <Text fontSize={"sm"} color={colors.TEXT_GRAY}>

              <Highlight query={["MP3", "WAV", "OOG", "FLAG", "MP4"]} styles={{ color: colors.SECONDARY_COLOR, fontWeight: "bold" }}>Supported file types: MP3, WAV, OOG, FLAG and MP4</Highlight>
            </Text>
          </VStack>

          <Stack w={"full"} spacing={4} mt={8}>
            <UploadItem
              icon={GiMusicalNotes}
              active={contentType === "song"}
              handleClick={() => setContentType("song")}
              title='Song' />

            <UploadItem
              icon={IoVideocam}
              active={contentType === "music-video"}
              handleClick={() => setContentType("music-video")}
              title='M/Video' text='Screen ratio: 16:9' />

            <UploadItem
              icon={TbActivityHeartbeat}
              active={contentType === "beat"}
              handleClick={() => setContentType("beat")}
              title='Beat' text={"For music producers"} />
          </Stack>

          <Drawer isOpen={isOpen} onClose={onClose} placement={"bottom"} >
            <DrawerOverlay />
            <DrawerContent bg={colors.BG_COLOR}>
              <DrawerBody>
                <HStack w={"full"} alignItems={"flex-start"} spacing={4} mt={8}>
                  <Checkbox colorScheme='teal' id={"accept"} mt={2} isChecked={agreed} onChange={toggleAgreed} />
                  <Stack as={"label"} htmlFor='accept' fontSize={"sm"} flex={4} cursor={"pointer"} userSelect={"none"} spacing={0}>
                    <Text color={colors.TEXT_GRAY}>For uploading, you consent and accept our <Link color={"blue.500"} as={ReactLink}>Terms of service</Link> and <Link color={"blue.500"} as={ReactLink}>Privacy Policy</Link>.</Text>
                    <Text color={colors.TEXT_GRAY}>Accounts which upload infringing contents will be banned indefinitely.</Text>
                  </Stack>
                </HStack>
              </DrawerBody>
              <DrawerFooter>
                <CustomButton
                  w={"full"}
                  colorScheme='teal'
                  onClick={handleOpenFilePicker}
                  isDisabled={!agreed || !contentType}
                >Continue</CustomButton>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </VStack>
      </AppContainer>
    </DashLayout>
  )
}


export default Upload