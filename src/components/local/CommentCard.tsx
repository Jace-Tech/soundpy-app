
import { Avatar, Flex, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../hooks/useColorMode'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommentCardProps extends CommentType { }

const CommentCard: React.FC<CommentCardProps> = ({ comment, content, user, date }) => {
    const { colors, hoverColor } = useColorMode()
    return (
        <HStack spacing={2} alignItems={"start"} py={2} bg={hoverColor}>
            <Avatar size={'md'} as={Link} to={`/profile/${user?.username}`} borderWidth={1} borderStyle={"solid"} borderColor={colors.DIVIDER} src={user?.profileImage} name={user?.musicName || user?.username} />
            <Stack spacing={1}>
                <Flex as={Link} to={`/profile/${user?.username}`} alignItems={'center'} gap={3}>
                    <Heading color={colors.TEXT_WHITE} size={"xs"}>{user?.musicName || user?.username}</Heading>
                    <Text color={colors.TEXT_GRAY} fontSize={'xs'}>{dayjs(date).fromNow()}</Text>
                </Flex>
                <Text color={colors.TEXT_DARK} fontSize={"sm"}>{comment}</Text>
            </Stack>
        </HStack>
    )
}

export default CommentCard