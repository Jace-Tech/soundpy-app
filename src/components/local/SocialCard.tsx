import { Avatar, Card, CardBody, CardFooter, CardHeader, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SocialCardProps {} 

const SocialCard:React.FC<SocialCardProps> = () => {
  return (
    <Card>
      <CardHeader>
        <HStack>
          <HStack>
            <Avatar 
              name={"Jace"}
              size={"sm"}
            />

            <Heading size={"sm"} noOfLines={1}>Jace Alex</Heading>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default SocialCard