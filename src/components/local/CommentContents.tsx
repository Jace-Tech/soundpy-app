import { Avatar, AvatarGroup, Center, CircularProgress, CloseButton, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Flex, FormControl, HStack, Heading, Icon, Spacer, Stack, Text, Textarea, VStack } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../hooks/useColorMode'
import { BsHeartFill } from 'react-icons/bs';
import CustomLoader from '../global/CustomLoader';
import CustomButton from '../global/CustomButton';
import CommentCard from './CommentCard';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommentContentProps {
    isGettingReactions: boolean;
    reactionError: boolean;
    textareaRef: React.MutableRefObject<HTMLTextAreaElement>;
    isReplying: CommentReply | null;
    likesData: LikeDataType[];
    setIsReplying: (value: React.SetStateAction<CommentReply>) => void
    commentData: CommentReply[];
    setShowingLikes: (value: React.SetStateAction<boolean>) => void;
    handleGetReaction: () => Promise<void>;
    handleSetReply: (data: CommentReply) => void;
    handleReply: () => Promise<void>;
    setComment: (value: React.SetStateAction<string>) => void;
    handleAddComment: () => Promise<void>;
    comment: string;
    user: UserData;
    isCommenting: boolean;
}

const CommentContent: React.FC<CommentContentProps> = ({ isGettingReactions, reactionError, likesData, handleGetReaction, setShowingLikes, handleSetReply, commentData, isReplying, textareaRef, comment, handleAddComment, handleReply, setComment, setIsReplying, isCommenting, user }) => {
    const { colors, hoverColor } = useColorMode()
    console.log("COMMENT DATA:", commentData)

    return (
        <DrawerContent h={500} bg={colors.BG_COLOR} borderTopRadius={"lg"}>
            <DrawerHeader borderBottomWidth='1px' borderBottomColor={colors.DIVIDER}>
                <HStack alignItems={"center"}>
                    <Text color={colors.TEXT_WHITE}>Comment</Text>
                    <Spacer />
                    {isGettingReactions ? (<HStack>
                        <CircularProgress isIndeterminate size={6} />
                        <Text fontSize={"xs"} fontStyle={"italic"} color={colors.TEXT_GRAY}>Loading likes</Text>
                    </HStack>) : reactionError ? null : likesData?.length ? (
                        // <Link to={`/content/${_id}/likes`}>
                        <HStack alignItems={"center"} cursor={"pointer"} userSelect={"none"} onClick={() => setShowingLikes(true)}>
                            <HStack spacing={1}>
                                <Icon color={"red.500"} fontSize={["md", "lg", "xl"]} as={BsHeartFill} />
                                <Text fontSize={"xs"} color={colors.TEXT_WHITE}>{likesData.length}</Text>
                            </HStack>
                            <AvatarGroup size='xs' max={2}>
                                {likesData.map(like => (
                                    <Avatar name={like?.user?.musicName || like?.user?.username} src={like.user?.profileImage} />
                                ))}
                            </AvatarGroup>
                        </HStack>
                        // </Link>
                    ) : null}
                </HStack>
            </DrawerHeader>
            <DrawerBody overflowY={"auto"}>
                <Stack spacing={2}>
                    {isGettingReactions ? (
                        <CustomLoader flex={1} alignItems={"center"} justifyContent={"center"} text='Loading comments' />
                    ) : reactionError ? (
                        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
                            <Text fontSize={"sm"} color={colors.TEXT_WHITE}>Failed to get comments</Text>
                            <CustomButton variant={"outline"} size={"sm"} onClick={handleGetReaction}>Refresh</CustomButton>
                        </VStack>
                    ) : commentData.length ? commentData.map(cmt => (
                        <CommentCard setIsReplying={handleSetReply} key={cmt?._id} {...cmt as any} />
                    )) : (
                        <Center flex={1} pt={5}>
                            <Text color={colors.TEXT_GRAY}>No comments</Text>
                        </Center>
                    )}
                </Stack>
            </DrawerBody>
            <DrawerFooter pos={"relative"} w={"100%"}>
                {isReplying &&
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
    )
}

export default CommentContent