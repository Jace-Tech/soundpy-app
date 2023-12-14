/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import { useNavigate, useParams } from 'react-router-dom'
import ChatHeader from './components/ChatHeader'
import ChatFooter from './components/ChatFooter'
import { Stack } from '@chakra-ui/react'
import MessageCard from './components/MessageCard'
import { messages } from '../../../contents/chat'
import AppContainer from '../../../components/global/AppContainer'
import ChatScroll from './components/ChatScroll'
import { DEFAULT_MAX_MESSAGES } from '../../../utils/constant'
import { DEFAULT_FOOTER_CAP_HEIGHT } from './footer_variants'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatProps { }

const Chat: React.FC<ChatProps> = () => {
  // const { colors } = useColorMode()
  const { username } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!username || username === 'undefined') return navigate("/inbox")
  }, [navigate, username])


  return (
    <DashLayout
      pos={"relative"}
      capHeight={DEFAULT_FOOTER_CAP_HEIGHT}
      header={<ChatHeader username={username!} />}
      footer={<ChatFooter />}
    >
      <AppContainer>
        <Stack py={4} spacing={4}>
          {messages.map((message, index) => <MessageCard key={`chat-${index + 1}`} {...message} />)}
          <ChatScroll isMuch={messages.length > DEFAULT_MAX_MESSAGES} />
        </Stack>
      </AppContainer>
    </DashLayout>
  )
}

export default Chat