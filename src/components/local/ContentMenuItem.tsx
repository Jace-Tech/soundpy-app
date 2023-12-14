import React from 'react'
import useColorMode from '../../hooks/useColorMode';
import { Button, ButtonProps, MenuItem } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ContentMenuItemProps extends ButtonProps { 
  text: string; 
  icon: React.ReactElement; 
  handleClick?: () => void; 
  bordered?: boolean; 
}

const ContentMenuItem: React.FC<ContentMenuItemProps> = ({ icon, text, bordered, handleClick, ...rest }) => {
  const { colors, hoverColor, isDark } = useColorMode()
  return (
    <MenuItem as={Button}
      textTransform='capitalize'
      onClick={handleClick}
      py={3}
      color={isDark ? colors.TEXT_WHITE : colors.TEXT_DARK}
      bg={"transparent"}
      borderTop={bordered ? `1px solid ${colors.DIVIDER}` : undefined}
      _hover={{ bg: hoverColor }}
      _active={{ bg: hoverColor }}
      fontWeight={"semibold"}
      fontSize={"sm"}
      icon={icon} {...rest}>{text}</MenuItem>
  )
}


export default ContentMenuItem