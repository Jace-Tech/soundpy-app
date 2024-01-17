/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import { Avatar, Badge, Box, Button, Container, HStack, Heading, IconButton, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'
import useColorMode from '../../../hooks/useColorMode'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack, BiSearch } from 'react-icons/bi'
import { useAppSelector } from '../../../store/hooks'
import AppContainer from '../../../components/global/AppContainer'
import CustomButton from '../../../components/global/CustomButton'
import { MAX_DEPTH } from '../../../utils/constant'
import { DEFAULT_BG_IMAGE } from '../../../assets'
import { useGlobalContext } from '../../../context'
import { getUserProfile } from '../../../apis/profile'
import useAlert from '../../../hooks/useAlert'
import ProfileSkeleton from '../../../components/partials/ProfileSkeleton'
import { formatNumber } from '../../../utils/helper'
import { getUserContentByUsername } from '../../../apis/content'
import EmptyState from '../../../components/global/EmptyState'
import FeedCard from '../../../components/local/FeedCard'
import usePagination from '../../../hooks/usePagination'
import CustomLoader from '../../../components/global/CustomLoader'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileProps { }



const Profile: React.FC<ProfileProps> = () => {
  const { colors, hoverColor } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const [user, setUserData] = useState<ProfileData>()
  const [contents, setContent] = useState<ContentFeedType[]>([])
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const param = useParams()
  const { showAlert } = useAlert()
  const navigate = useNavigate()
  const { data, isLoading: isFetching, handleFetchRequest, handleFilterRequest, perPage, page } = usePagination((page, perPage, filter) => getUserContentByUsername(param?.username, token!.token, page, perPage, filter))
  const [type, setType] = useState<ContentType>("")

  const { setMainHeight } = useGlobalContext()

  useEffect(() => {
    setContent(data)
  }, [data])

  const handleGetType = () => {
    if (!type) return handleFetchRequest(page, perPage)
    return handleFilterRequest(`type=${type}`)
  }

  useEffect(() => {
    handleGetType()
  }, [type])


  useEffect(() => {
    if (!user) return
    handleFetchRequest(page, perPage)
  }, [user])

  const fetchUserData = async () => {
    if (!param?.username || !token) return
    try {
      openLoading()
      const resultProfile = await getUserProfile(param.username, token.token)
      if (!resultProfile.success) throw new Error(resultProfile.message)
      console.log("RESULT [PROFILE]:", resultProfile)
      setUserData(resultProfile.data)
    }
    catch (error: any) {
      console.log("ERROR:", error.message)
      showAlert(error.message)
    }
    finally {
      closeLoading()
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [param])

  useEffect(() => {
    setMainHeight(null)
  }, [setMainHeight])

  if (isLoading) return <ProfileSkeleton />

  return (
    <DashLayout capHeight={55}>
      <Box pos={"relative"}>
        <AppContainer pos={"relative"} h={200} borderColor={colors.PRIMARY_COLOR} borderBottomWidth={3} bg={`url(${user?.coverImage || DEFAULT_BG_IMAGE})`} bgPos={"center center"} w={"full"} bgSize={"cover"}>
          <Box pos={"fixed"} backdropFilter={"blur(4px)"} bg={hoverColor} w={"full"} top={0} py={4} left={0} zIndex={MAX_DEPTH}>
            <Container maxW={"container.sm"}>
              <HStack>
                <IconButton
                  shadow={"dark-lg"}
                  aria-label='back'
                  size={"sm"}
                  _hover={{ bg: colors.BG_COLOR }}
                  color={colors.TEXT_WHITE}
                  bg={colors.BG_COLOR}
                  fontSize={"lg"}
                  onClick={() => navigate(-1)}
                  variant={"ghost"}
                  icon={<BiArrowBack />}
                />

                <Spacer />

                <IconButton
                  shadow={"dark-lg"}
                  aria-label='back'
                  size={"sm"}
                  _hover={{ bg: colors.BG_COLOR }}
                  color={colors.TEXT_WHITE}
                  bg={colors.BG_COLOR}
                  fontSize={"lg"}
                  variant={"ghost"}
                  icon={<BiSearch />}
                />
              </HStack>
            </Container>
          </Box>
        </AppContainer>

        <AppContainer mt={-12} left={0} w={"full"} pos={"absolute"}>
          <HStack>
            <HStack>
              <Avatar
                borderColor={colors.PRIMARY_COLOR}
                borderWidth={3}
                bg={user?.profileImage ? colors.BG_COLOR : colors.BG_COLOR}
                size={"xl"}
                name={user?.musicName || user?.username?.slice(1)}
                src={user?.profileImage}
              />
            </HStack>
          </HStack>
        </AppContainer>
      </Box>

      <AppContainer mt={12} py={3} borderBottom={`1px solid ${colors.DIVIDER}`}>
        <Stack spacing={0}>
          <HStack alignItems={"center"}>
            <Stack>
              <Heading size={"md"} color={colors.TEXT_WHITE}>{user?.musicName}</Heading>
              <Text fontSize={"md"} color={colors.TEXT_GRAY}>{user?.username}</Text>
            </Stack>

            <Spacer />

            {user?.username !== param.username && <CustomButton px={6}>Follow</CustomButton>}
          </HStack>

          <Badge w={"fit-content"} rounded={"full"} px={2} py={1} mt={2} colorScheme={
            user?.musicCareer?.toLowerCase() === "producer" ?
              "red" : user?.musicCareer?.toLowerCase() === "artist" ?
                "blue" : "teal"}>{user?.musicCareer || "Music Lover"}</Badge>
        </Stack>

        {user?.bio && (
          <Text
            bg={hoverColor}
            px={3} py={2}
            fontSize={"sm"}
            noOfLines={4}
            borderLeft={`3px solid ${colors.PRIMARY_COLOR}`}
            fontStyle={"italic"}
            color={colors.TEXT_WHITE}
            mt={3}>{user?.bio}</Text>
        )}

        <HStack spacing={2} fontWeight={"semibold"} mt={3}>
          <HStack spacing={1} alignItems={"center"} fontSize={"sm"}>
            <Text color={colors.TEXT_WHITE}>{formatNumber(user?.followers.length)}</Text>
            <Text color={colors.TEXT_GRAY}>Followers</Text>
          </HStack>

          <HStack spacing={1} alignItems={"center"} fontSize={"sm"}>
            <Text color={colors.TEXT_WHITE}>{formatNumber(user?.following.length)}</Text>
            <Text color={colors.TEXT_GRAY}>Following</Text>
          </HStack>
        </HStack>
      </AppContainer>

      <AppContainer borderBottom={`1px solid ${colors.DIVIDER}`} bg={colors.BG_COLOR} pos={"sticky"} left={0} top={0} zIndex={MAX_DEPTH - 20}>

        <HStack px={4} py={2} alignItems={"center"}>
          <Button bg={"transparent"} onClick={() => setType("")} aria-selected={type === ""} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>All</Button>

          <Button bg={"transparent"} onClick={() => setType("song")} aria-selected={type === "song"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Song</Button>

          <Button bg={"transparent"} onClick={() => setType("music-video")} aria-selected={type === "music-video"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Video</Button>

          <Button bg={"transparent"} onClick={() => setType("beat")} aria-selected={type === "beat"} _selected={{ color: "#fff", bg: colors.PRIMARY_COLOR }} px={5} py={1.5} rounded="full" color={colors.TEXT_DARK} fontWeight={"semibold"}>Beat</Button>
        </HStack>
      </AppContainer>

      <AppContainer py={3}>
        {/* TRAVERSE THROUGH THE [POST] ARRAY */}
        {isFetching ? (
          <CustomLoader />
        ) : contents.length ? contents.map((content, index) => (
          <Stack spacing={6} key={index}>
            <FeedCard key={content._id} contents={contents} setContents={setContent} {...content} />
          </Stack>
        )) : (
          <EmptyState />
        )}
      </AppContainer>
    </DashLayout>
  )
}

export default Profile
