import { Circle, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, SelectProps, Stack, Textarea, TextareaProps } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../hooks/useColorMode'
import { useController } from 'react-hook-form';
import { IoInformation } from "react-icons/io5"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomInputProps {
  control?: any;
  label?: string;
  value?: string;
  rules?: any;
  selectOptions?: { value: string, label: string }[];
  isSelect?: boolean;
  isTextArea?: boolean;
  name: string;
  info?: string;
  InputProps?: InputProps | TextareaProps | SelectProps;
}

const CustomInput: React.FC<CustomInputProps> = ({ control, label, value, name, rules, isSelect, selectOptions, isTextArea, info, InputProps }) => {
  const { colors } = useColorMode()
  const { field, fieldState } = useController({ control, name, defaultValue: value || "", rules })

  return (
    <Stack spacing={1}>
      <FormControl isInvalid={Boolean(fieldState.error)}>
        <HStack mb={2} alignItems={"center"}>
          <FormLabel m={0} color={colors.TEXT_WHITE} fontSize={"sm"} fontWeight={"bold"}>{label}</FormLabel>
          {info &&
            <Popover>
              <PopoverTrigger>
                <Circle bg={colors.TEXT_GRAY}>
                  <IoInformation color={colors.BG_COLOR} />
                </Circle>
              </PopoverTrigger>
              <PopoverContent color='white' bg={"#666"} borderColor={"#555"}>
                <PopoverArrow bg={"#666"} />
                <PopoverCloseButton />
                <PopoverHeader borderColor={"#777"} fontWeight={"bold"} fontSize={"sm"}>Note</PopoverHeader>
                <PopoverBody fontSize={"xs"}>{info}</PopoverBody>
              </PopoverContent>
            </Popover>}
        </HStack>

        {isSelect ? (
          <Select color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"} {...field} {...InputProps as SelectProps}>
            <option value="" selected disabled>Choose {label}</option>
            {selectOptions?.map((option) => (
              <option key={option.label} value={option.value}>{option.label}</option>
            ))}
          </Select>
        ) : isTextArea ? (
          <Textarea noOfLines={4} color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"} {...field} {...InputProps as TextareaProps}></Textarea>
        ) : (
          <Input color={colors.TEXT_WHITE} _placeholder={{ color: colors.TEXT_GRAY }} fontSize={"sm"} {...field} {...InputProps as InputProps}/>
        )}
        <FormErrorMessage fontSize={"xs"}>{fieldState.error?.message}</FormErrorMessage>
      </FormControl>
    </Stack>
  )
}

export default CustomInput