import { Avatar, DrawerBody, DrawerContent, DrawerHeader, HStack, Heading, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../hooks/useColorMode'
import CustomLoader from '../global/CustomLoader';
import CustomButton from '../global/CustomButton';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import EmptyState from '../global/EmptyState';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LikesContentProps {
    likesData: LikeDataType[];
    isLoading: boolean;
    reactionError: boolean;
    handleGetReaction: () => Promise<void>;
    setShowingLikes: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikesContent: React.FC<LikesContentProps> = ({ isLoading, likesData, reactionError, handleGetReaction, setShowingLikes }) => {
    const { colors, hoverColor } = useColorMode()

    return (
        <DrawerContent h={500} bg={colors.BG_COLOR} borderTopRadius={"lg"}>
            <DrawerHeader borderBottomWidth='1px' borderBottomColor={colors.DIVIDER}>
                <HStack alignItems={"center"}>
                    <IconButton
                        size={"sm"}
                        fontSize={"sm"}
                        aria-label='Go back'
                        _hover={{ bg: "transparent" }}
                        onClick={() => setShowingLikes(false)}
                        color={colors?.TEXT_WHITE}
                        variant={"outline"}
                        icon={<MdOutlineKeyboardBackspace fontSize={"18px"} />}
                    />
                    <Text color={colors.TEXT_WHITE}>Likes</Text>
                </HStack>
            </DrawerHeader>
            <DrawerBody overflowY={"auto"}>
                <Stack spacing={2}>
                    {isLoading ? (
                        <CustomLoader text='Loading likes' />
                    ) : reactionError ? (
                        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
                            <Text fontSize={"sm"} color={colors.TEXT_WHITE}>Failed to get comments</Text>
                            <CustomButton variant={"outline"} size={"sm"} onClick={handleGetReaction}>Refresh</CustomButton>
                        </VStack>
                    ) : likesData.length ? (
                        <Stack>
                            {likesData.map(like => (
                                <HStack spacing={2} px={2} alignItems={"start"} py={2} bg={hoverColor}>
                                    <Avatar size={'md'} as={Link} to={`/profile/${like?.user?.username}`} borderWidth={1} borderStyle={"solid"} borderColor={colors.DIVIDER} src={like?.user?.profileImage} name={like?.user?.musicName || like?.user?.username} />
                                    <Stack flex={1} as={Link} to={`/profile/${like?.user?.username}`} alignItems={'flex-start'} gap={1}>
                                        <Heading color={colors.TEXT_WHITE} size={"xs"}>{like?.user?.musicName}</Heading>
                                        <Text color={colors.TEXT_GRAY} fontSize={'xs'}>{like?.user?.username}</Text>
                                    </Stack>
                                </HStack>
                            ))}
                        </Stack>
                    ) : (
                        <EmptyState text='No likes found' />
                    )}
                </Stack>
            </DrawerBody>
        </DrawerContent>
    )
}

export default LikesContent