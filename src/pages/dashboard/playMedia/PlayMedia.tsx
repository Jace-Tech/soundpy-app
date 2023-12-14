import React, { useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import AppContainer from '../../../components/global/AppContainer'
import { Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
// import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { IoIosAddCircleOutline, IoIosPlayCircle, IoIosSkipBackward, IoMdSkipForward } from 'react-icons/io'
import { BsHeartFill } from 'react-icons/bs';
import { IoPauseCircle } from 'react-icons/io5'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlayMediaProps { }

const PlayMedia: React.FC<PlayMediaProps> = () => {
  const [playing, setPlaying] = useState<boolean>(true)
  // const { colors, hoverColor } = useColorMode()
  // const { cardStyle } = useAppSelector(state => state.settingStore)

  // const dispatch = useAppDispatch()

  return (
    <DashLayout
      header={<AppBar page='Play media' />}
    >

      <AppContainer>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
          </CardBody>
        </Card>

        <Stack mt={50}>
          <Heading size='md'>Nigeria go better</Heading>
          <Text size='sm'>Prinx Emmanuel</Text>
        </Stack>

        {/* ACTION BAR */}
        <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent='space-between' mt={19} placeItems={'center'}>
          <IoIosAddCircleOutline size={25} />
        
          <BsHeartFill color='' size={20} />
        </Flex>

        <Flex minWidth='max-content' mt={5} alignItems='center' gap='6' justifyContent='center' placeItems={'center'} onClick={() => setPlaying(!playing)}>
          <IoIosSkipBackward size={23} />
          { playing ? <IoPauseCircle color='teal' size={90} /> : <IoIosPlayCircle size={90} /> }
          <IoMdSkipForward size={23} />
        </Flex>

      </AppContainer>

    </DashLayout>
  )
}

export default PlayMedia