/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HStack, IconButton, Text, BoxProps } from '@chakra-ui/react'
import React from 'react'
import { BiArrowBack } from "react-icons/bi"
import AppContainer from './AppContainer';
import useColorMode from '../../hooks/useColorMode';
import { useNavigate } from 'react-router-dom';
import { MAX_DEPTH } from '../../utils/constant';
import { BsSearch } from 'react-icons/bs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppBarProps extends BoxProps {
  page: string;
  bordered?: boolean;
  hasSearch?: boolean;
  MiddleElement?: React.ReactElement;
  RightElement?: React.ReactNode;
  LeftElement?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ page, bordered, RightElement, LeftElement, MiddleElement, hasSearch, ...prop }) => {
  const navigate = useNavigate()
  const { colors } = useColorMode()

  return (
    <AppContainer py={3} bgColor={colors.BG_COLOR} borderBottom={bordered ? `1px solid ${colors.DIVIDER}` : undefined} top={0} left={0} w={"100%"} zIndex={MAX_DEPTH} {...prop as any}>
      <HStack>
        {
        LeftElement ? LeftElement :
          <IconButton
            aria-label='back'
            size={"sm"}
            _hover={{ bg: "transparent" }}
            color={colors.TEXT_GRAY}
            fontSize={"xl"}
            onClick={() => navigate(-1)}
            variant={"ghost"}
            icon={<BiArrowBack />}
          />
        }
        {MiddleElement ? MiddleElement : <Text flex={1} fontWeight={"bold"} letterSpacing={"wider"} textTransform={"uppercase"} color={colors.TEXT_WHITE} fontSize={".9rem"} textAlign={"center"}>{page}</Text>}
        {hasSearch ? (
          <IconButton
            aria-label='back'
            size={"sm"}
            _hover={{ bg: "transparent" }}
            color={colors.TEXT_GRAY}
            fontSize={"xl"}
            onClick={() => { }}
            variant={"ghost"}
            icon={<BsSearch />}
          />
        ) : RightElement}
      </HStack>
    </AppContainer>
  )
}

export default AppBar