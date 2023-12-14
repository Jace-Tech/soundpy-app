import React from 'react'
import DashLayout from '../../components/global/DashLayout'
import AppBar from '../../components/global/AppBar'
import { Container, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import useColorMode from '../../hooks/useColorMode'
import AppContainer from '../../components/global/AppContainer'
// import FeedCard from '../../components/local/FeedCard'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyFeedProps { }

const MyFeed: React.FC<MyFeedProps> = () => {
  const { colors } = useColorMode()
  return (
    <DashLayout
      capHeight={90}
      header={<AppBar page='My Feeds' hasSearch bordered />}
    >

      <Tabs pos={"relative"} borderColor={colors.DIVIDER} variant={"unstyled"}>
        <TabList borderBottom={`1px solid ${colors.DIVIDER}`} p={3}>
          <Container maxW={"container.sm"}>
            <HStack alignItems={"center"}>
              <Tab  _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Video</Tab>
              <Tab  _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Song</Tab>
              <Tab  _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Beat</Tab>
              <Tab  _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Live</Tab>
            </HStack>
          </Container>
        </TabList>
        <TabPanels>
          <TabPanel color={colors.TEXT_WHITE} px={0}>
            <AppContainer>
              {/* <FeedCard /> */}
            </AppContainer>
          </TabPanel>
          <TabPanel color={colors.TEXT_WHITE}>
            <AppContainer>Song</AppContainer>
          </TabPanel>
          <TabPanel color={colors.TEXT_WHITE}>
            <AppContainer>Beat</AppContainer>
          </TabPanel>
          <TabPanel color={colors.TEXT_WHITE}>
            <AppContainer>Live</AppContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashLayout>
  )
}

export default MyFeed