import { Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AppContainer from './AppContainer'
import useColorMode from '../../hooks/useColorMode'
import { EMPTY_IMAGE } from '../../assets'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EmptyStateProps {} 

const EmptyState:React.FC<EmptyStateProps> = () => {
  const {colors} = useColorMode()
  return (
    <AppContainer mt={10}>
      <VStack alignItems={"center"} p={2}>
        <Image src={EMPTY_IMAGE} maxW={150} objectFit={"contain"} />
        <Text size={"sm"} color={colors.TEXT_GRAY}>No contents found</Text>
      </VStack>
    </AppContainer>
  )
}

export default EmptyState