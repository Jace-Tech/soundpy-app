import { HStack } from '@chakra-ui/react'
import React from 'react'
import { FOOTER_LINKS } from '../../contents'
import FooterItem from '../local/FooterItem'
import AppContainer from './AppContainer'
import useColorMode from '../../hooks/useColorMode'
import { MAX_DEPTH } from '../../utils/constant'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterProps {
  handleRefresh?: () => void; 
} 

const Footer:React.FC<FooterProps> = ({ handleRefresh }) => {
  const {colors} = useColorMode()
  return (
    <AppContainer bg={colors.BG_COLOR} zIndex={MAX_DEPTH / 2} borderTop={`1px solid ${colors.DIVIDER}`}>
      <HStack alignItems={"flex-end"} p={2}>
        { FOOTER_LINKS.map(footerLink => <FooterItem handleRefresh={handleRefresh} {...footerLink} key={footerLink.title} />) }
      </HStack>
    </AppContainer>
  )
}

export default Footer