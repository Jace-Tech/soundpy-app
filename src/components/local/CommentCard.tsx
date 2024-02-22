
import { Avatar, Button, Collapse, Flex, HStack, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../hooks/useColorMode'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import CustomButton from '../global/CustomButton'
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommentCardProps extends CommentReply {
    setIsReplying?: (data: CommentReply) => void;
}

const CommentCard: React.FC<CommentCardProps> = (prop) => {
    const { setIsReplying } = prop
    const { colors } = useColorMode()
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Stack spacing={0} mb={2}>
            <UserCommentComponent
                comment={prop.comment}
                date={prop.date}
                prop={prop}
                setIsReplying={setIsReplying}
                user={prop.user}
            />
            <Collapse in={isOpen} animateOpacity>
                <Stack ml={4} pl={2} py={4} borderLeft={`1px solid ${colors.DIVIDER}`}>
                    {prop?.reply && prop.reply.map(reply => (
                        <UserCommentComponent date={reply.date} key={`reply-${reply._id}`} comment={reply.reply} user={reply.user} />
                    ))}
                </Stack>
            </Collapse>
            {prop?.reply && prop.reply.length ? <Button alignSelf={"flex-start"} onClick={onToggle} variant={"link"} size={"xs"} colorScheme='gray'>{!isOpen ? "View" : "Hide"} replies ({prop?.reply.length})</Button> : null}
        </Stack>
    )
}

export default CommentCard




interface UserCommentComponentProp {
    user?: UserData;
    comment: string;
    date: string;
    prop?: any;
    // setIsReplying?: React.Dispatch<React.SetStateAction<CommentReply>>
    setIsReplying?: (data: CommentReply) => void;
}
const UserCommentComponent: React.FC<UserCommentComponentProp> = ({ user, comment, date, setIsReplying, prop }) => {
    const { colors, hoverColor } = useColorMode()
    return (
        <Stack spacing={2} px={2} py={2} bg={hoverColor} borderRadius={"md"}>
            <HStack spacing={2} alignItems={"center"}>
                <Avatar size={'md'} as={Link} to={`/profile/${user?.username}`} borderWidth={1} borderStyle={"solid"} borderColor={colors.DIVIDER} src={user?.profileImage} name={user?.musicName || user?.username} />
                <Stack spacing={0} alignItems={"flex-start"} flex={1}>
                    <Flex as={Link} to={`/profile/${user?.username}`} alignItems={'center'} gap={3}>
                        <Heading color={colors.TEXT_WHITE} size={"xs"}>{user?.musicName || user?.username}</Heading>
                    </Flex>
                    <Text color={colors.TEXT_GRAY} fontSize={'xs'}>{dayjs(date).fromNow()}</Text>
                </Stack>
            </HStack>
            <Text color={colors.TEXT_DARK} fontSize={"sm"}>{comment}</Text>
            <HStack justifyContent={"flex-end"}>
                {setIsReplying && <CustomButton onClick={() => setIsReplying(prop)} size={"sm"} bg={"transparent"} _hover={{ color: colors.PRIMARY_COLOR }} color={colors.PRIMARY_COLOR} variant={"link"}>Reply</CustomButton>}
            </HStack>
        </Stack>
    )
}