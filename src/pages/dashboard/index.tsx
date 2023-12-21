/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AppContainer from '../../components/global/AppContainer';
import Header from '../../components/global/Header';
import SectionBox from '../../components/global/SectionBox';
import DashLayout from '../../components/global/DashLayout';
import useColorMode from '../../hooks/useColorMode';
import { Button, Center, CircularProgress, HStack, Stack } from '@chakra-ui/react';
import FeedCard from '../../components/local/FeedCard';
import { getPostContent } from '../../apis/content'
import { useAppSelector } from '../../store/hooks';
import CustomLoader from '../../components/global/CustomLoader';
import EmptyState from '../../components/global/EmptyState';
import usePagination from '../../hooks/usePagination';
import { MAX_DEPTH } from '../../utils/constant';
// import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = () => {
  const { colors } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const [type, setType] = useState<ContentType>("")
  const { data, handleFetchRequest, page, perPage, isLoading, isLoadingMore, handleFetchMore, handleFilterRequest } = usePagination((page, perPage, filter) => getPostContent(token!.token, page, perPage, filter))
  const [contents, setContents] = useState<ContentFeedType[]>([])

  useEffect(() => {
    setContents(data)
  }, [data])


  const handleScrollFetch = async () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (scrollTop + windowHeight >= documentHeight) handleFetchMore()
  }

  const handleGetType = () => {
    if (!type) return handleFetchRequest(page, perPage)
    return handleFilterRequest(`type=${type}`)
  }


  useEffect(() => {
    handleGetType() 
  }, [type])

  useEffect(() => {
    handleFetchRequest(page, perPage)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScrollFetch)
    return () => {
      window.removeEventListener("scroll", handleScrollFetch)
    }
  }, [])

  useEffect(() => {
    console.log("DATA:", data)
  }, [data])
  console.log("TOCK:", token)

  return (
    <DashLayout
      header={<Header borderBottom={`1px solid ${colors.DIVIDER}`} />}
    >
      <SectionBox HeaderProp={{ px: 4 }} sectionTitle='Feeds' bg={colors.BG_COLOR} h={"fit-content"}>
        <HStack px={4} py={2} borderY={`1px solid ${colors.DIVIDER}`} bg={colors.BG_COLOR} alignItems={"center"} pos={"sticky"} left={0} top={0} zIndex={MAX_DEPTH - 20}>
          <Button onClick={() => setType("")} aria-selected={type === ""} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_WHITE} fontWeight={"semibold"}>All</Button>

          <Button onClick={() => setType("song")} aria-selected={type === "song"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_WHITE} fontWeight={"semibold"}>Song</Button>

          <Button onClick={() => setType("music-video")} aria-selected={type === "music-video"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_WHITE} fontWeight={"semibold"}>Video</Button>

          <Button onClick={() => setType("beat")} aria-selected={type === "beat"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_WHITE} fontWeight={"semibold"}>Beat</Button>
          {/* <Tab _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Live</Tab> */}
        </HStack>
        <AppContainer>
          {/* TRAVERSE THROUGH THE [POST] ARRAY */}
          {isLoading ? (
            <CustomLoader />
          ) : contents.length ? contents.map((content, index) => (
            <Stack spacing={6} key={index}>
              <FeedCard key={content._id} {...content} />
            </Stack>
          )) : (
            <EmptyState />
          )}
          {isLoadingMore && (
            <Center py={4}>
              <CircularProgress isIndeterminate color='gray.400' size={8} />
            </Center>
          )}
        </AppContainer>
      </SectionBox>
    </DashLayout>
  )
}

export default Dashboard;