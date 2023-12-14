/* eslint-disable @typescript-eslint/no-empty-function */
import { HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import React from 'react'
import AppBar from '../../../../components/global/AppBar'
import useColorMode from '../../../../hooks/useColorMode'
import { BsGripHorizontal, BsHeart, BsSearch } from 'react-icons/bs'
import AppContainer from '../../../../components/global/AppContainer'
import CustomButton from '../../../../components/global/CustomButton'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlayHeaderProps {} 

const PlayHeader:React.FC<PlayHeaderProps> = () => {
  const { colors, hoverColor } = useColorMode()
  return (
    <Stack pb={2}>
          <AppBar
            bordered
            page='Playlist'
            LeftElement={
              <IconButton
                aria-label='favorite'
                size={"sm"}
                _hover={{ bg: "transparent" }}
                color={colors.TEXT_GRAY}
                fontSize={"xl"}
                onClick={() => {}}
                variant={"ghost"}
                icon={<BsHeart />}
              />
            }
            RightElement={
              <IconButton
                size={"md"}
                variant={""}
                fontSize={"xl"}
                aria-label='Filter'
                color={colors.TEXT_WHITE}
                icon={<BsGripHorizontal/>}
              />
            }
          />
          <AppContainer py={2}>
            <HStack spacing={4}>
              <InputGroup size={"md"} bg={hoverColor} rounded={"full"} border={"none"}>
                <InputLeftElement ml={1}>
                  <Icon as={BsSearch} color={colors.TEXT_GRAY} fontSize={"xl"} />
                </InputLeftElement>
                <Input border={"none"} fontSize={"md"} color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} placeholder='Artist and Songs' flex={1} rounded={"full"} />
              </InputGroup>
              <CustomButton px={6}>Subscribe</CustomButton>
            </HStack>
          </AppContainer>
        </Stack>
  )
}

export default PlayHeader