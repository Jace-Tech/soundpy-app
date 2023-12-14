import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
// import colors from '../../utils/colors'
import useColorMode from '../../hooks/useColorMode'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomButtonProps extends ButtonProps {} 

const CustomButton:React.FC<CustomButtonProps> = (props) => {
  const { colors } = useColorMode()
  return <Button fontSize={"sm"} _active={{ bg: !props.colorScheme && colors.PRIMARY_COLOR }} _hover={{ bg: !props.colorScheme &&colors.PRIMARY_COLOR }} fontWeight={"bold"} fontFamily={"Manrope"} bg={!props.colorScheme ? colors.PRIMARY_COLOR : undefined } color={"white"} rounded={"lg"} {...props} />
}

export default CustomButton