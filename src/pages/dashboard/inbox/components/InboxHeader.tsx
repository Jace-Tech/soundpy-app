import { Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import React from 'react'
import AppBar from '../../../../components/global/AppBar'
import AppContainer from '../../../../components/global/AppContainer'
import useColorMode from '../../../../hooks/useColorMode'
import { BsSearch } from 'react-icons/bs'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InboxHeaderProps { }

const InboxHeader: React.FC<InboxHeaderProps> = () => {
  const { colors, hoverColor } = useColorMode()
  return (
    <Stack pb={4}>
      <AppBar page="Negotiate" />
      <AppContainer>
        <InputGroup>
          <InputLeftElement>
            <Icon fontSize={"xl"} color={colors.TEXT_GRAY} as={BsSearch} />
          </InputLeftElement>
          <Input bg={hoverColor} color={colors.TEXT_WHITE} border={"none"} placeholder='Names and words' _placeholder={{ color: colors.TEXT_GRAY }} />
        </InputGroup>
      </AppContainer>
    </Stack>
  )
}

export default InboxHeader