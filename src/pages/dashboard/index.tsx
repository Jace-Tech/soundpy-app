/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AppContainer from '../../components/global/AppContainer';
import Header from '../../components/global/Header';
import SectionBox from '../../components/global/SectionBox';
import DashLayout from '../../components/global/DashLayout';
import useColorMode from '../../hooks/useColorMode';
import { Center, CircularProgress, Stack } from '@chakra-ui/react';
import FeedCard from '../../components/local/FeedCard';
import { getPostContent } from '../../apis/content'
import { useAppSelector } from '../../store/hooks';
import CustomLoader from '../../components/global/CustomLoader';
import EmptyState from '../../components/global/EmptyState';
import usePagination from '../../hooks/usePagination';
// import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = () => {
  const { colors } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const { data, handleFetchRequest, page, perPage, isLoading, isLoadingMore, handleFetchMore } = usePagination((page, perPage, filter) => getPostContent(token!.token, page, perPage, filter))
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
  },  [data])
  console.log("TOCK:", token)

  return (
    <DashLayout
      header={<Header borderBottom={`1px solid ${colors.DIVIDER}`} />}
    >
      <AppContainer bg={colors.BG_COLOR} h={"fit-content"}>
        <SectionBox sectionTitle='Feeds'>
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
        </SectionBox>
      </AppContainer>
    </DashLayout>
  )
}

export default Dashboard;