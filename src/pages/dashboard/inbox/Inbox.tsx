import React from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppContainer from '../../../components/global/AppContainer'
import { Stack } from '@chakra-ui/react'
import InboxCard from './components/InboxCard'
import InboxHeader from './components/InboxHeader'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InboxProps {} 

const Inbox:React.FC<InboxProps> = () => {
  return (  
    <DashLayout
      capHeight={179}
      header={<InboxHeader />}
    >
      <AppContainer pb={8}>
        <Stack spacing={2}>
          <InboxCard bordered username={"@jace"} />
          <InboxCard bordered />
        </Stack>
      </AppContainer>
    </DashLayout>
  )
}

export default Inbox