/* eslint-disable @typescript-eslint/no-explicit-any */
import { useController } from "react-hook-form";
import useColorMode from "../../../../hooks/useColorMode";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";

interface PriceComponentProp {
  control: any;
}

const PriceComponent: React.FC<PriceComponentProp> = ({ control }) => {
  const { colors } = useColorMode()
  const { field, fieldState } = useController({ 
    control, 
    defaultValue: 0,
    name: "price",
 })

  // const { getDecrementButtonProps, getIncrementButtonProps, getInputProps } = useNumberInput({
  //   "aria-label": "Price Input",
  //   precision: 2,
  //   defaultValue: 0.01,
  //   step: 0.05,
  //   min: 0.00
  // })

  return (
    <FormControl isInvalid={Boolean(fieldState.error)}>
      <FormLabel color={colors.TEXT_WHITE} fontSize={"sm"} fontWeight={"bold"}>Price</FormLabel>
      <HStack maxW='320px'>
        {/* <Button {...getDecrementButtonProps()} color={"#fff"} bgColor={colors.TEXT_DARK}>-</Button> */}
        <InputGroup>
          <Input maxLength={5} borderColor={colors.DIVIDER} fontSize={"sm"} color={colors.TEXT_WHITE} {...field}  />
          <InputRightAddon borderColor={colors.DIVIDER} color={colors.TEXT_WHITE} bgColor={colors.DIVIDER} children="π" />
        </InputGroup>
        {/* <Button {...getIncrementButtonProps()}color={"#fff"} bgColor={colors.TEXT_DARK}>+</Button> */}
      </HStack>
      <FormHelperText color={colors.TEXT_GRAY} fontSize={"xs"}>Fix your price or Leave blank for free</FormHelperText>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default PriceComponent