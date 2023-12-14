/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import DashLayout from '../../../components/global/DashLayout'
import useColorMode from '../../../hooks/useColorMode'
import PlayHeader from './components/PlayHeader'
import { Container, HStack, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import AppContainer from '../../../components/global/AppContainer'
import { playlistItems } from '../../../contents/playlist'
import PlaylistItem from './components/PlaylistItem'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlaylistProps { }

const Playlist: React.FC<PlaylistProps> = () => {
  const { colors, 
    // hoverColor 
  } = useColorMode()
  // const [type, setType] = useState<string>("all")

  const tabItem = ["all", "video", "song", "beat"]

  return (
    <DashLayout
      header={<PlayHeader />}
    >
      <Tabs pos={"relative"} borderColor={colors.DIVIDER} variant={"unstyled"}>
        <TabList borderTop={`1px solid ${colors.DIVIDER}`} borderBottom={`1px solid ${colors.DIVIDER}`} p={2}>
          <Container maxW={"container.sm"}>
            <HStack alignItems={"center"}>
              { tabItem.map(item => <Tab key={item} textTransform={"capitalize"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>{item}</Tab>) }
            </HStack>
            <TabIndicator />
          </Container>
        </TabList>
        <TabPanels>
          { tabItem.map(item => (
            <TabPanel key={`panel-${item}`} color={colors.TEXT_WHITE} px={0}>
              <AppContainer textTransform={"capitalize"} >
                <Stack>
                  { playlistItems.map((item, index) => (
                    <PlaylistItem {...item} key={`${index}-${item.artist}`} />
                  )) }
                </Stack>
              </AppContainer>
            </TabPanel>
          )) }
        </TabPanels>
      </Tabs>
    </DashLayout>
  )
}

export default Playlist