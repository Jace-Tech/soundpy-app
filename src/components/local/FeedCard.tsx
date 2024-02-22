/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, Drawer, DrawerOverlay, HStack, Heading, Icon, IconButton, IconProps, Image, Menu, MenuButton, MenuList, Spacer, Stack, StackProps, Text, useDisclosure, useTheme } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import useColorMode from '../../hooks/useColorMode';
import { WELCOME_BG_IMAGE } from '../../assets';
import { IoEllipsisVertical, IoEyeOffOutline, IoFlagSharp, IoNotificationsOffOutline, IoPersonAdd } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import { MdBlock, MdPlaylistAdd, MdChat, MdDelete, } from 'react-icons/md';
import { BsChatFill, BsDot, BsHeart, BsHeartFill } from 'react-icons/bs';

import { IconType } from 'react-icons';
import CustomButton from '../global/CustomButton';
import { TERTIARY_COLOR } from '../../utils/colors';
import ContentMenuItem from './ContentMenuItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComment, blockContent, followUser, likeContent } from '../../apis/user';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { formatNumber } from '../../utils/helper';
import { addToPlaylist } from '../../apis/playlist';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import usePayment from '../../hooks/usePayment';
import { contentPayment } from '../../apis/payment';
import { deleteContent, getReaction, postReply } from '../../apis/content';
import { MAX_DEPTH } from '../../utils/constant';
import CommentContent from './CommentContents';
import LikesContent from './LikesContents';
import { populateContent } from '../../store/slices/dataSlice';
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FeedCardProps extends ContentFeedType {
  contents?: ContentFeedType[];
  dataId: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ contents, dataId, isLiked, title, createdAt, type, price, user, _id, isPurchased, coverImage, likes, comments, contentUrl, genre, playlists, isMine, features }) => {
  const me = useAppSelector(state => state.userStore.user)
  const navigate = useNavigate()

  const { colors, hoverColor } = useColorMode()
  const { isOpen: isCommentOpen } = useDisclosure()
  const { isOpen: isLiking, onOpen: openLiking, onClose: closeLiking } = useDisclosure()
  const { isOpen: isFollowing, onOpen: openFollowing, onClose: closeFollowing } = useDisclosure()
  const { isOpen: isBlocking, onOpen: openBlocking, onClose: closeBlocking } = useDisclosure()
  const { isOpen: isAdding, onOpen: openAdding, onClose: closeAdding } = useDisclosure()
  const { isOpen: isCommenting, onOpen: openCommenting, onClose: closeCommenting } = useDisclosure()
  const { isOpen: isGettingReactions, onOpen: openGettingReactions, onClose: closeGettingReactions } = useDisclosure()
  const cardStyle = useAppSelector(state => state.settingStore.cardStyle)
  const token = useAppSelector(state => state.userStore.token)
  const { showAlert } = useAlert()
  const { handlePiPayment, isPaying, openPaying, closePaying } = usePayment()
  const { isOpen, onOpen, onClose, } = useDisclosure()
  const { isOpen: isDeleting, onOpen: openDeleting, onClose: closeDeleting } = useDisclosure()
  const [comment, setComment] = useState("")
  const [reactionError, setReactionError] = useState<boolean>(false)
  const [isPurchasedState, setIsPurchased] = useState<boolean>(isPurchased)
  const [showingLikes, setShowingLikes] = useState<boolean>(false)

  const [commentData, setCommentData] = useState<CommentReply[]>([])
  const [likesData, setLikesData] = useState<LikeDataType[]>([]);
  const [isReplying, setIsReplying] = useState<CommentReply | null>(null)
  const theme = useTheme()
  const dispatch = useAppDispatch()
  // console.log(isLiking, isCommenting)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const CARD_WITH_BG = {
    bg: hoverColor,
    border: "none",
    shadow: "lg",
  }

  const CARD_WITH_BORDER = {
    bg: "transparent",
    border: `1px solid ${colors.DIVIDER}`,
    as: "section",
    shadow: "none",
  }

  const cardTheme = {
    bordered: CARD_WITH_BORDER,
    bg: CARD_WITH_BG
  }

  // FUNCTION TO LIKE CONTENT
  const handleLike = async () => {
    try {
      openLiking()
      const result = await likeContent(_id, token?.token! as string)
      if (!result.success) throw new Error(result.message)

      // UPDATE CONTENT 
      const index = contents.findIndex(item => item._id === _id)
      if (index !== -1) {
        const prevItems = [...contents]
        prevItems[index] = result.data
        console.log("PREV:", prevItems)
        dispatch(populateContent(prevItems))
      }
      showAlert(result.message, "success")
    }
    catch (err: any) {
      console.log("ERR:", err.message)
      showAlert(err.message, "error")

    }
    finally {
      closeLiking()
    }
  }

  // FUNCTION TO FOLLOW USER
  const handleFollowUser = async () => {
    try {
      openFollowing()
      const result = await followUser(user?._id, token?.token! as string)
      if (!result.success) throw new Error(result.message)
      showAlert(result.message, "success")
    }
    catch (err: any) {
      showAlert(err.message, "error")
    }
    finally {
      closeFollowing()
    }
  }

  // FUNCTION TO BLOCK CONTENT
  const handleBlockContent = async () => {
    try {
      openBlocking()
      const result = await blockContent(_id, token?.token! as string)
      if (!result.success) throw new Error(result.message)
      showAlert(result.message, "success")
    }
    catch (err: any) {
      showAlert(err.message, "error")
    }
    finally {
      closeBlocking()
    }
  }

  // FUNCTION TO ADD COMMENT
  const handleAddComment = async () => {
    try {
      openCommenting()
      const data = { comment }
      const result = await addComment(_id, data, token?.token! as string)
      if (!result.success) throw new Error(result.message)

      setCommentData(prev => ([result.data, ...prev]))
      setComment("")
      showAlert(result.message, "success")
    }
    catch (error: any) {
      showAlert(error.message, "error")
    }
    finally {
      closeCommenting()
    }
  }

  // FUNCTION TO ADD COMMENT
  const handleReply = async () => {
    try {
      openCommenting()
      const result = await postReply(token?.token! as string, isReplying._id, comment)
      if (!result.success) throw new Error(result.message)

      const prevData = [...commentData]
      const index = prevData.findIndex(comment => comment._id === isReplying._id)
      if(index === -1) return

      prevData[index] = {
        ...prevData[index],
        reply: [result.data, ...prevData[index]?.reply]
      }
      setCommentData(prevData)
      setComment("")
      setIsReplying(null)
      showAlert(result.message, "success")
    }
    catch (error: any) {
      showAlert(error.message, "error")
    }
    finally {
      closeCommenting()
    }
  }

  // PURCHASE CONTENT
  const handlePurchase = () => {
    const meta = {
      content: { title, createdAt, type, price, user, _id, isPurchased, coverImage, likes, comments, contentUrl, genre, playlists }
    }
    handlePiPayment(+price, `Purchase of ${title}`, "content", meta, (async (paymentId, txid) => {
      try {
        openPaying()
        const payload: CompletePaymentPayload = {
          paymentId,
          txid
        }
        const result = await contentPayment(payload, token.token)
        if (!result.success) throw new Error(result.message)

        // UPDATE THE PAYMENT
        setIsPurchased(true)
        showAlert(result.message, "success")

        // REDIRECT TO TRANSACTIONS PAGE
        navigate(`/transaction/${result.data.transaction._id}`)
      }
      catch (err: any) {
        showAlert(err.message, "error")
      }
      finally {
        closePaying()
      }
    }))
  }

  // DELETE CONTENT
  const handleDeleteContent = async () => {
    try {
      openDeleting()
      const result = await deleteContent(_id, token.token!)
      if(!result.success) throw new Error(result.message)
      showAlert(result.message, "success")

    } 
    catch (error: any) {
      showAlert(error.message, "error")
    }
    finally {
      closeDeleting()
    }
  }

  // ADD TO PLAYLIST
  const handleAddToPlaylist = async () => {
    try {
      openAdding()
      const result = await addToPlaylist(_id, token.token);
      if (!result.success) throw new Error(result.message)
      showAlert(result.message, "success")
    }
    catch (err: any) {
      showAlert(err.message, "error")
    }
    finally {
      closeAdding()
    }
  }

  // HANDLE SHARE CONTENT
  const handleShareContent = () => {
    window?.Pi.openShareDialog(title, `Testing here`)

  }

  // HANDLE DOWNLOAD CONTENT 
  const handleDownload = async () => {
    const a = document.createElement("a")
    a.href = contentUrl
    a.download = title
    a.click()
    a.remove()
  }


  const handleOpen = async () => {
    await handleGetReaction()
    onOpen()
  }

  const handleGetReaction = async () => {
    try {
      openGettingReactions()
      setReactionError(false)
      const result = await getReaction(_id, token.token!)
      if (!result.success) throw new Error(result.message)
      setLikesData(result.data.likes)
      setCommentData(result.data.comments)
    } catch (error: any) {
      console.log(error.messsage)
      setReactionError(true)
    }
    finally {
      closeGettingReactions()
    }
  }


  const handleSetReply = (data: CommentReply) => {
    setIsReplying(data)
    textareaRef?.current.focus?.()
  }


  const handlePlay = (event: any) => {
    const currentAudio = event.target

    const items =[...document.querySelectorAll("[data-playing]")]
    const prevPlaying = items.find(item => (item as any)?.dataset.playing === "1") as any
    if(prevPlaying && !prevPlaying.paused) {
      prevPlaying.pause()
      prevPlaying.currentTime = 0
      prevPlaying.setAttribute("data-playing", "0")
    }

    currentAudio.setAttribute("data-playing", "1")
    currentAudio?.play()
  }


  return (
    <>
      <Card w={"100%"}
        {...cardTheme[cardStyle]}
        as={"section"}
        id={_id}
        mb={2}
        data-id={dataId}
      >
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          {showingLikes ? (
            <LikesContent
              isLoading={isGettingReactions}
              handleGetReaction={handleGetReaction}
              likesData={likesData}
              reactionError={reactionError}
              setShowingLikes={setShowingLikes}
            />
          ) : (
            <CommentContent
              comment={comment}
              commentData={commentData}
              handleAddComment={handleAddComment}
              handleGetReaction={handleGetReaction}
              handleReply={handleReply}
              handleSetReply={handleSetReply}
              isCommenting={isCommenting}
              isGettingReactions={isGettingReactions}
              isReplying={isReplying}
              likesData={likesData}
              reactionError={reactionError}
              setComment={setComment}
              setIsReplying={setIsReplying}
              setShowingLikes={setShowingLikes}
              textareaRef={textareaRef}
              user={user}
            />
          )}
        </Drawer>

        <CardHeader p={3}>
          <HStack alignItems={"center"}>
            <HStack as={ReactLink} to={"/profile/" + user?.username} spacing={2}>
              <Avatar border={`1px solid ${colors.DIVIDER}`} src={user?.profileImage} name={user?.musicName || user?.username} />
              <Stack spacing={0}>
                <Heading color={colors.TEXT_WHITE} size={"sm"}>{user?.musicName}</Heading>
                <Text color={colors.TEXT_DARK} fontSize={"xs"}>@{user?.username}</Text>
              </Stack>
            </HStack>

            <Spacer />

            <HStack spacing={4}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  color={colors.TEXT_WHITE}
                  aria-label='Options'
                  icon={<IoEllipsisVertical />}
                  variant='link'
                />
                <MenuList zIndex={MAX_DEPTH - 10} shadow={"lg"} bg={colors.BG_COLOR} border={colors.BG_COLOR}>
                  { !isMine ? (
                    <>
                      <ContentMenuItem
                        isLoading={isFollowing}
                        handleClick={handleFollowUser}
                        text={`Follow ${user?.username}`}
                        icon={<IoPersonAdd size={20} />}
                      />

                      <ContentMenuItem
                        handleClick={() => { }}
                        text={`Mute ${user?.username}`}
                        icon={<IoNotificationsOffOutline size={20} />}
                      />

                      <ContentMenuItem
                        handleClick={() => { }}
                        text={`Report ${user?.username}`}
                        icon={<IoFlagSharp size={20} />}
                      />

                      <ContentMenuItem
                        isLoading={isBlocking}
                        handleClick={handleBlockContent}
                        text={`Block ${user?.username}`}
                        icon={<MdBlock size={20} />}
                      />

                      <ContentMenuItem
                        handleClick={() => { }}
                        text={"Hide this content"}
                        icon={<IoEyeOffOutline size={20} />}
                      />
                    </>
                  ) : (
                      <ContentMenuItem
                        isLoading={isDeleting}
                        handleClick={handleDeleteContent}
                        text="Delete Content"
                        color={"red.500"}
                        icon={<MdDelete color={theme.colors.red[500]} size={20} />}
                      />
                  )}

                  <ContentMenuItem
                    handleClick={handleShareContent}
                    text={"Share"}
                    icon={<IoIosShareAlt size={20} />}
                  />
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </CardHeader>

        <CardBody px={3} pt={0} position={"relative"}>
          {type === "music-video" ? (
            <video controls src={contentUrl} poster={coverImage}></video>
          ) : (
            <Box position={"relative"}>
              <Image
                rounded={"md"}
                w={"100%"}
                aspectRatio={16 / 12}
                objectFit={"cover"}
                src={coverImage || WELCOME_BG_IMAGE}
              />
              <Box zIndex={5} pos={"absolute"} bottom={0} left={0} w={"full"}>
                <audio onPlay={handlePlay} data-playing={0} controls preload='metadata' src={contentUrl} style={{ width: "100%" }}></audio>
              </Box>
            </Box>
          )}
        </CardBody>

        <CardFooter px={3} pt={0}>
          <Stack w={"full"} spacing={1}>
            <HStack spacing={1}>
              <Heading size={"sm"} color={colors.TEXT_WHITE}>{title}</Heading>
              {(features.filter(_ => _) && features.filter(_ => _).length) ? (
                <Text color={colors.TEXT_GRAY} fontSize={"sm"}>(feat) {features.filter(_ => _).join(", ")} </Text>
              ) : null}
            </HStack>
            <HStack>
              <Text fontSize={"xs"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{genre?.name}</Text>
              <Icon as={BsDot} color={"gray.500"} mx={0} />
              <Text fontSize={"xs"} noOfLines={1} fontWeight={"medium"} color={colors.TEXT_DARK}>{dayjs(createdAt).fromNow()}</Text>
            </HStack>
            <HStack w={"full"} alignItems={"center"}>
              <HStack flex={1} alignItems={"center"} spacing={4}>
                <ContentFooterItem
                  handleClick={handleOpen}
                  icon={isCommentOpen ? BsChatFill : MdChat}
                  text={formatNumber(comments)}
                />

                <ContentFooterItem
                  handleClick={handleLike}
                  iconProps={{ color: "red.600" }}
                  isLoading={isLiking}
                  icon={isLiked ? BsHeartFill : BsHeart}
                  text={formatNumber(likes)}
                />

                <ContentFooterItem
                  handleClick={handleAddToPlaylist}
                  iconProps={{ color: colors.TEXT_WHITE }}
                  icon={MdPlaylistAdd}
                  isLoading={isAdding}
                  text={formatNumber(playlists)}
                />
              </HStack>

              <Spacer />

              {price && !isPurchasedState ? (
                <HStack>
                  <Text fontSize={"sm"} color={TERTIARY_COLOR}>{+price.toFixed(2)}π</Text>
                  <CustomButton isLoading={isPaying} h={8} fontSize={"xs"} fontWeight={900} rounded={5} colorScheme='red' onClick={handlePurchase}>Buy</CustomButton>
                </HStack>
              ) : (
                <CustomButton onClick={handleDownload} h={8} fontSize={"xs"} fontWeight={900} rounded={5}>Download</CustomButton>
              )}
            </HStack>
          </Stack>
        </CardFooter>
      </Card>
    </>
  )
}

interface ContentFooterItemProp extends StackProps {
  text: string;
  icon: IconType;
  iconProps?: IconProps;
  handleClick?: () => void;
  isLoading?: boolean;
}
const ContentFooterItem: React.FC<ContentFooterItemProp> = ({ icon, isLoading, text, handleClick, iconProps, ...prop }) => {
  const { colors, isDark } = useColorMode()

  if (isLoading) return (
    <CircularProgress size={6} color="gray.400" isIndeterminate />
  )
  return (
    <HStack as={Button} variant={"ghost"} colorScheme={"gray"} spacing={1} alignItems={"center"} cursor={"pointer"} color={isDark ? colors.TEXT_WHITE : colors.TEXT_DARK} py={2} size={"xs" as any} onClick={handleClick} {...prop}>
      <Icon fontSize={["md", "lg", "xl"]} as={icon} {...iconProps} />
      <Text fontWeight={"bold"} fontSize={["xs", "sm"]}>{text}</Text>
    </HStack>
  )

}

export default FeedCard