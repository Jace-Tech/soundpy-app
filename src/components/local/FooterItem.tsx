/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Icon as ReactIcon, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link as ReactLink, useLocation } from "react-router-dom"
import useColorMode from '../../hooks/useColorMode';
import { UPLOAD } from '../../assets';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterItemProps {
  title: string;
  link: string;
  Icon: any;
  main?:boolean;
  ActiveIcon: any;
} 

const FooterItem:React.FC<FooterItemProps> = ({ link, title, main, ActiveIcon, Icon }) => {
  const { colors } = useColorMode()
  const { pathname } = useLocation()
  const isActive = pathname === link
  
  return (
    <VStack spacing={1} pb={1} flex={1} _hover={{ textDecoration: "none" }} as={ReactLink} to={isActive ? "#" : link }>
      {
        main ? <Image src={UPLOAD} w={8} objectFit={"contain"} /> :
          <ReactIcon fontSize={"xl"} fontWeight={"bold"} color={ isActive ? colors.PRIMARY_COLOR : colors.TEXT_GRAY} as={isActive ? ActiveIcon : Icon} />
      }
    
       <Text fontSize={"xs"} color={isActive ? colors.PRIMARY_COLOR : colors.TEXT_GRAY} fontWeight={"medium"}>{title}</Text>
    </VStack>
  )
}

export default FooterItem