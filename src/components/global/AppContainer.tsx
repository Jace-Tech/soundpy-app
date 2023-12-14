import { Box, ButtonProps, Container } from '@chakra-ui/react'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppContainerProps extends ButtonProps { }

const AppContainer: React.FC<AppContainerProps> = ({ children, ...props }) => {
  return (
    <Box {...props}>
      <Container maxW={"container.sm"}>
        { children }
      </Container>
    </Box>
  )
}

export default AppContainer