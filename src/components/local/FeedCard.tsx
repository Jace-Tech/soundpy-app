/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Avatar, AvatarGroup, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, CircularProgress, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, HStack, Heading, Icon, IconButton, IconProps, Image, Menu, MenuButton, MenuList, Spacer, Stack, StackProps, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import useColorMode from '../../hooks/useColorMode';
import { WELCOME_BG_IMAGE } from '../../assets';
import { IoEllipsisVertical, IoEyeOffOutline, IoFlagSharp, IoNotificationsOffOutline, IoPersonAdd } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import { MdBlock, MdPlaylistAdd, MdChat, } from 'react-icons/md';
import { BsChatFill, BsDot, BsHeart, BsHeartFill } from 'react-icons/bs';

import { IconType } from 'react-icons';
import CustomButton from '../global/CustomButton';
import { TERTIARY_COLOR } from '../../utils/colors';
import ContentMenuItem from './ContentMenuItem';
import { useAppSelector } from '../../store/hooks';
import { addComment, blockContent, followUser, likeContent } from '../../apis/user';
import { useNavigate, Link as ReactLink, Link } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { formatNumber } from '../../utils/helper';
import { addToPlaylist } from '../../apis/playlist';
// import { useGlobalContext } from '../../context';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentCard from './CommentCard';
import usePayment from '../../hooks/usePayment';
import { contentPayment } from '../../apis/payment';
import { postReply } from '../../apis/content';
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FeedCardProps extends ContentFeedType { 
  setContents?: React.Dispatch<React.SetStateAction<ContentFeedType[]>>;
  contents?: ContentFeedType[];
}

const FeedCard: React.FC<FeedCardProps> = ({ contents, setContents, title, createdAt, type, price, user, _id, isPurchased, coverImage, likes, comments, contentUrl, genre, playlists }) => {
  const me = useAppSelector(state => state.userStore.user)
  const navigate = useNavigate()

  const { colors, hoverColor } = useColorMode()
  const { isOpen: isCommentOpen } = useDisclosure()
  const { isOpen: isLiking, onOpen: openLiking, onClose: closeLiking} = useDisclosure()
  const { isOpen: isFollowing, onOpen: openFollowing, onClose: closeFollowing} = useDisclosure()
  const { isOpen: isBlocking, onOpen: openBlocking, onClose: closeBlocking} = useDisclosure()
  const { isOpen: isAdding, onOpen: openAdding, onClose: closeAdding} = useDisclosure()
  const { isOpen: isCommenting, onOpen: openCommenting, onClose: closeCommenting} = useDisclosure()
  const cardStyle = useAppSelector(state => state.settingStore.cardStyle)
  const token = useAppSelector(state => state.userStore.token)
  const { showAlert } = useAlert()
  const { handlePiPayment, isPaying, openPaying, closePaying } = usePayment()
  const { isOpen, onOpen, onClose, } = useDisclosure()
  const [comment, setComment] = useState("")
  const [isPurchasedState, setIsPurchased] = useState<boolean>(isPurchased)
  const [isLiked, setIsLiked] = useState(() => !!(likes.find((like) => like!.user?._id === me!._id)))

  const [commentData, setCommentData] = useState<CommentReply[]>(comments)
  const [playListData, setPlaylistData] = useState<PlaylistType[]>(playlists);
  const [isReplying, setIsReplying] = useState<CommentReply | null>(null)
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
      if(index !== -1) {
        const prevItems = [...contents]
        prevItems[index] = result.data
        console.log("PREV:", prevItems)
        setContents(prevItems) 
      }

      if (result.message.toLowerCase().includes("unlike")) {
        setIsLiked(false)
      }

      else {
        setIsLiked(true)
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
    catch(err: any) {
      showAlert( err.message, "error")   
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
      const result = await postReply( token?.token! as string, isReplying._id, comment)
      if (!result.success) throw new Error(result.message)
      
      const prevData = [...commentData]
      const index = prevData.findIndex(comment => comment._id === isReplying._id)
      prevData[index] = {
        ...prevData[index],
        reply: [result.data, ...prevData[index].reply]
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
      content: {title, createdAt, type, price, user, _id, isPurchased, coverImage, likes, comments, contentUrl, genre, playlists }
    }
    handlePiPayment(+price, `Purchase of ${title}`, "content", meta, ( async (paymentId, txid) => {
      try {
        openPaying()
        const payload:CompletePaymentPayload = {
          paymentId,
          txid
        }
        const result = await contentPayment(payload, token.token)
        if(!result.success) throw new Error(result.message)

        // UPDATE THE PAYMENT
        setIsPurchased(true)
        showAlert(result.message, "success")

        // REDIRECT TO TRANSACTIONS PAGE
        navigate(`/transaction/${result.data.transaction._id}`)
      }
      catch (err: any){
        showAlert(err.message, "error")
      }
      finally {
        closePaying()
      }
    }))
  }

  // ADD TO PLAYLIST
  const handleAddToPlaylist = async () => {
    try {
      openAdding()
      const result = await addToPlaylist(_id, token.token);
      if(!result.success) throw new Error(result.message)
      showAlert(result.message, "success")
      setPlaylistData(prev => ([result.data, ...prev]))
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


  const handleSetReply = (data: CommentReply) => {
    setIsReplying(data)
    textareaRef?.current.focus?.()
  }

  return (
    <>
      <Card w={"100%"}
        {...cardTheme[cardStyle]}
        as={"section"}
        id={_id}
        mb={2}
      >
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent h={500} bg={colors.BG_COLOR} borderTopRadius={"lg"}>
            <DrawerHeader borderBottomWidth='1px' borderBottomColor={colors.DIVIDER}>
              <HStack alignItems={"center"}>
                <Text color={colors.TEXT_WHITE}>Comment</Text>
                <Spacer />
                { likes?.length ? (
                  <Link to={`/content/${_id}/likes`}>
                    <HStack alignItems={"center"}>
                      <HStack spacing={1}>
                        <Icon color={"red.500"} fontSize={["md", "lg", "xl"]} as={BsHeartFill} />
                        <Text fontSize={"xs"} color={colors.TEXT_WHITE}>{likes.length}</Text>
                      </HStack>
                      <AvatarGroup size='xs' max={2}>
                        {likes.map(like => (
                          <Avatar  name={like?.user?.musicName || like?.user?.username} src={like.user?.profileImage} />
                        ))}
                      </AvatarGroup>
                    </HStack>
                  </Link>
                ) : null }
              </HStack>
            </DrawerHeader>
            <DrawerBody overflowY={"auto"}>
              <Stack spacing={2}>
                { commentData.length ? commentData.map(comment => (
                  <CommentCard setIsReplying={handleSetReply} key={_id} {...comment} />
                )) : (
                  <Center flex={1} pt={5}>
                    <Text color={colors.TEXT_GRAY}>No comments</Text>
                  </Center>
                ) }
              </Stack>
            </DrawerBody>
            <DrawerFooter pos={"relative"} w={"100%"}>
              { isReplying && 
              <Stack mx={6} bg={colors.BG_COLOR} right={0} py={2} pos={"absolute"} bottom={"85%"} left={0}>
                <HStack alignItems={"center"} bg={hoverColor} p={3}>
                  <Stack borderLeft={`3px solid ${colors.DIVIDER}`} pl={2} spacing={1} flex={1}>
                    <Flex as={Link} to={`/profile/${isReplying?.user?.username}`} alignItems={'center'} gap={3}>
                      <Heading color={colors.TEXT_WHITE} size={"xs"}>{isReplying?.user?.musicName || isReplying?.user?.username}</Heading>
                      <Text color={colors.TEXT_GRAY} fontSize={'xs'}>{dayjs(isReplying?.date).fromNow()}</Text>
                    </Flex>
                    <Text color={colors.TEXT_DARK} fontSize={"sm"}>{isReplying?.comment}</Text>
                  </Stack>
                  <CloseButton pos={"static"} color={colors.TEXT_WHITE} onClick={() => setIsReplying(null)} />
                </HStack>
              </Stack>
              }
              <FormControl>
                <Flex flexDirection={'row'} alignItems={'end'} gap={2}>
                  <Textarea ref={textareaRef} color={colors.TEXT_WHITE} onChange={(e) => setComment(e.target.value)} size={'sm'} rows={1} variant={"outline"} placeholder={`Add comment for ${user?.username}`} value={comment}></Textarea>
                  <CustomButton isLoading={isCommenting} onClick={isReplying ? handleReply : handleAddComment}>Send</CustomButton>
                </Flex>
              </FormControl>
            </DrawerFooter>
          </DrawerContent>
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
                <MenuList shadow={"lg"} bg={colors.BG_COLOR} border={colors.BG_COLOR}>
                  {user?._id !== me?._id && (
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
          { type === "music-video" ? (
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
                  <audio controls preload='metadata' src={contentUrl} style={{ width: "100%" }}></audio>
                </Box>
              </Box>
          ) }
        </CardBody>

        <CardFooter px={3} pt={0}>
          <Stack w={"full"} spacing={1}>
            <Heading size={"sm"} color={colors.TEXT_WHITE}>{title}</Heading>
            <HStack>
              <Text fontSize={"xs"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{genre?.name}</Text>
              <Icon as={BsDot} color={"gray.500"} mx={0} />
              <Text fontSize={"xs"} noOfLines={1} fontWeight={"medium"} color={colors.TEXT_DARK}>{dayjs(createdAt).fromNow()}</Text>
            </HStack>
            <HStack w={"full"} alignItems={"center"}>
              <HStack flex={1} alignItems={"center"} spacing={4}>
                <ContentFooterItem
                  handleClick={onOpen}
                  icon={isCommentOpen ? BsChatFill : MdChat}
                  text={formatNumber(commentData.length)}
                />

                <ContentFooterItem
                  handleClick={handleLike}
                  iconProps={{ color: "red.600" }}
                  isLoading={isLiking}
                  icon={isLiked ? BsHeartFill : BsHeart}
                  text={formatNumber(likes.length)}
                />

                <ContentFooterItem
                  handleClick={handleAddToPlaylist}
                  iconProps={{ color: colors.TEXT_WHITE }}
                  icon={MdPlaylistAdd}
                  isLoading={isAdding}
                  text={formatNumber(playListData.length)}
                />
              </HStack>

              <Spacer />

              { price && !isPurchasedState ? (
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

  if(isLoading) return (
    <CircularProgress size={6} color="gray.400" isIndeterminate  />
  )
  return (
    <HStack as={Button} variant={"ghost"} colorScheme={"gray"} spacing={1} alignItems={"center"} cursor={"pointer"} color={isDark ? colors.TEXT_WHITE : colors.TEXT_DARK} py={2} size={"xs" as any} onClick={handleClick} {...prop}>
      <Icon fontSize={["md", "lg", "xl"]} as={icon} {...iconProps} />
      <Text fontWeight={"bold"} fontSize={["xs", "sm"]}>{text}</Text>
    </HStack>
  )

}

export default FeedCard