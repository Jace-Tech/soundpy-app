/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AppContainer from '../../components/global/AppContainer';
import Header from '../../components/global/Header';
import SectionBox from '../../components/global/SectionBox';
import DashLayout from '../../components/global/DashLayout';
import useColorMode from '../../hooks/useColorMode';
import { Box, Button, CircularProgress, HStack, Stack, Text } from '@chakra-ui/react';
import FeedCard from '../../components/local/FeedCard';
import { getPostContent } from '../../apis/content'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomLoader from '../../components/global/CustomLoader';
import EmptyState from '../../components/global/EmptyState';
import usePagination from '../../hooks/usePagination';
import { MAX_DEPTH } from '../../utils/constant';
import { FOOTER_CAP_HEIGHT } from './chat/footer_variants';
import { populateContent } from '../../store/slices/dataSlice';
// import { isElementInView } from '../../utils/helper';
// import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = () => {
  const { colors } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const [type, setType] = useState<ContentType>("")
  const { data, handleFetchRequest, page, perPage, isLoading, isLoadingMore, handleFilterRequest } = usePagination((page, perPage, filter) => getPostContent(token!.token, page, perPage, filter), 12)
  const contents = useAppSelector(state => state.dataStore.contents)
  const dispatch = useAppDispatch()
  // const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  useEffect(() => {
    dispatch(populateContent(data))
  }, [data])


  // const handleScrollFetch = async () => {
  //   const mainElem = document.querySelector<HTMLDivElement>("#loader")
  //   const isIntoView = isElementInView(mainElem)

    
  //   if(shouldFetch && isIntoView) {
  //     setShouldFetch(false)
  //     setTimeout(() =>  {
  //       setShouldFetch(true)
  //     }, 5000)
  //     handleFetchMore()
  //   }
  // }

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
    if(contents.length) return
    handleFetchRequest(page, perPage)
  }, [])

  useEffect(() => {
    // const observer = new IntersectionObserver(() => {

    // }, {  })
    // const mainElem = document.querySelector("#main-body")
  }, [])

  return (
    <DashLayout capHeight={FOOTER_CAP_HEIGHT} handleRefresh={handleRefresh}>
      <Header borderBottom={`1px solid ${colors.DIVIDER}`} />
      <SectionBox HeaderProp={{ px: 4 }} pt={0} bg={colors.BG_COLOR} h={"fit-content"}>
        <AppContainer  borderBottom={`1px solid ${colors.DIVIDER}`} bg={colors.BG_COLOR} pos={"sticky"} left={0} top={0} zIndex={MAX_DEPTH - 20}>

          <HStack px={4} py={2} alignItems={"center"}>
            <Button onClick={() => setType("")} bg={"transparent"} aria-selected={type === ""} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>All</Button>

            <Button onClick={() => setType("song")} aria-selected={type === "song"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} bg={"transparent"} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Song</Button>

            <Button bg={"transparent"} onClick={() => setType("music-video")} aria-selected={type === "music-video"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Video</Button>

            <Button bg={"transparent"} onClick={() => setType("beat")} aria-selected={type === "beat"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Beat</Button>
            {/* <Tab _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_GRAY} fontWeight={"semibold"}>Live</Tab> */}
          </HStack>
        </AppContainer>
        <AppContainer>
          <Stack spacing={6}>

            {/* TRAVERSE THROUGH THE [POST] ARRAY */}
            {isLoading ? (
              <CustomLoader />
            ) : contents.length ? contents.map((content, index) => (
              <FeedCard key={content._id} dataId={String(index === (contents.length - 1))} contents={contents} {...content} />
            )) : (
              <EmptyState />
            )}
            {isLoadingMore && (
              <HStack justifyContent={"center"}>
                <Text fontSize={"sm"} color={colors.TEXT_GRAY}>Loading more</Text>
                <CircularProgress isIndeterminate size={6} />
              </HStack>
            )}
            <Box id='loader'></Box>
          </Stack>

        </AppContainer>
      </SectionBox>
    </DashLayout>
  )
}

export default Dashboard;