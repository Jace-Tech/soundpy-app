import {Heading, Stack, StackProps, TextProps } from '@chakra-ui/react'
import React from 'react'
import useColorMode from "../../hooks/useColorMode"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SectionBoxProps extends StackProps {
  sectionTitle?: string;
  HeaderProp?: TextProps;
}

const SectionBox: React.FC<SectionBoxProps> = ({ sectionTitle, children, HeaderProp, ...prop }) => {
  const { colors } = useColorMode()
  return (
    <Stack py={6} {...prop}>
      { sectionTitle  &&  <Heading mb={4} color={colors.TEXT_WHITE} size={"md"} {...HeaderProp}>{sectionTitle}</Heading>}
      { children }
    </Stack>
  )
}

export default SectionBox