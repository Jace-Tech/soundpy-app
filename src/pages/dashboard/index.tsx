/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import AppContainer from '../../components/global/AppContainer';
import Header from '../../components/global/Header';
import SectionBox from '../../components/global/SectionBox';
import useColorMode from '../../hooks/useColorMode';
import { Box, Button, CircularProgress, HStack, Stack, Text } from '@chakra-ui/react';
import FeedCard from '../../components/local/FeedCard';
import { getPostContent } from '../../apis/content'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomLoader from '../../components/global/CustomLoader';
import EmptyState from '../../components/global/EmptyState';
import usePagination from '../../hooks/usePagination';
import { MAX_DEPTH } from '../../utils/constant';
import { populateContent } from '../../store/slices/dataSlice';
import Footer from '../../components/global/Footer';
import "../../styles/dash.css"
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

// import { isElementInView } from '../../utils/helper';
// import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = () => {
  const { colors } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const [type, setType] = useState<ContentType>("")
  const { data, handleFetchRequest, page, perPage, isLoadingMore: isFetching, isLoading, handleFilterRequest, handleFetchMore } = usePagination((page, perPage, filter) => getPostContent(token!.token, page, perPage, filter), 2)
  const contents = useAppSelector(state => state.dataStore.contents)
  const dispatch = useAppDispatch()
  const headerRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState<boolean>(false)


  const handleScrollToView = (id?: string) => {
    if(!id) return
    const element = document.querySelector(`#item-${id}`)
    if(!element) return 
    element.scrollIntoView({ behavior: "auto", block: "start" })
  }
  useInfiniteScroll(async () => await handleFetchMore(handleScrollToView))

  useEffect(() => {
    dispatch(populateContent(data))
  }, [data])

  const handleGetType = () => {
    if (!type) return handleFetchRequest(page, perPage)
    return handleFilterRequest(`type=${type}`)
  }

  const handleRefresh = () => {
    handleFetchRequest(page, perPage)
  }

  useEffect(() => {
    handleGetType()
  }, [type])

  useEffect(() => {
    if (contents.length) return
    handleFetchRequest(page, perPage)
  }, [])


  // FIXED NAV CHANGER
  useEffect(() => {
    const handleScrollCheck = () => {
      const offset = window.scrollY
      const maxHeaderHeight = 142
      if(offset >= maxHeaderHeight) return setIsFixed(true)
      return setIsFixed(false)
    }

    window.addEventListener("scroll", handleScrollCheck)
    return () =>{ 
      window.removeEventListener("scroll", handleScrollCheck)
    }
  }, [])

  return (
    <Box minH={"100vh"}>
      <Header borderBottom={`1px solid ${colors.DIVIDER}`} />
      <Box ref={headerRef} mb={4} px={4} borderBottom={`1px solid ${colors.DIVIDER}`} bg={colors.BG_COLOR} pos={isFixed ? "fixed" : undefined}  left={0} w={"100%"} top={0} zIndex={MAX_DEPTH - 20}>

        <HStack px={4} py={2} alignItems={"center"}>
          <Button onClick={() => setType("")} bg={"transparent"} aria-selected={type === ""} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>All</Button>

          <Button onClick={() => setType("song")} aria-selected={type === "song"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} bg={"transparent"} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Song</Button>

          <Button bg={"transparent"} onClick={() => setType("music-video")} aria-selected={type === "music-video"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Video</Button>

          <Button bg={"transparent"} onClick={() => setType("beat")} aria-selected={type === "beat"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Beat</Button>
          {/* <Tab _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Live</Tab> */}
        </HStack>
      </Box>
      <SectionBox HeaderProp={{ px: 4 }} pt={0} bg={colors.BG_COLOR} h={"fit-content"} mb={16}>
        <AppContainer>
          <Stack spacing={4}>
            {/* TRAVERSE THROUGH THE [POST] ARRAY */}
            {isLoading ? (
              <CustomLoader />
            ) : contents.length ? contents.map((content, index) => (
              <FeedCard key={content._id} dataId={String(index === (contents.length - 1))} contents={contents} {...content} />
            )) : (
              <EmptyState />
            )}

            {isFetching && (
              <HStack justifyContent={"center"}>
                <Text fontSize={"sm"} color={colors.TEXT_GRAY}>Loading more</Text>
                <CircularProgress isIndeterminate size={6} />
              </HStack>
            )}
          </Stack>

        </AppContainer>
      </SectionBox>
      <Box pos={"fixed"} zIndex={MAX_DEPTH} bottom={0} left={0} w={"100%"}>
        <Footer handleRefresh={handleRefresh} />
      </Box>
    </Box>
  )
}

export default Dashboard;