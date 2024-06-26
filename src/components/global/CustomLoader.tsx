/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import useColorMode from '../../hooks/useColorMode';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomLoaderProps extends StackProps {
  text?: string;
} 

const CustomLoader:React.FC<CustomLoaderProps> = ({ text, ...rest }) => {
    const { colors } = useColorMode()
  return (
    <VStack spacing={1} {...rest}>
        <CircularProgress color='gray.400' isIndeterminate size={8} />
        <Text  fontSize={"sm"} color={colors.TEXT_GRAY}>{text || "Loading contents"}</Text>
    </VStack>
  )
}

export default CustomLoader