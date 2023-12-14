/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatScrollProps {
  isMuch?: boolean;
} 

const ChatScroll:React.FC<ChatScrollProps> = ({ isMuch }) => {
  const scrollRef = useRef(null) as any

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: isMuch ? "instant" : "smooth" })
  }, [scrollRef, isMuch])
  
  return <Box ref={scrollRef} /> 
}

export default ChatScroll