/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuList, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../../../hooks/useColorMode';
import { WELCOME_BG_IMAGE } from '../../../../assets';
import { IoEllipsisVertical, IoEyeOffOutline, IoFlagSharp, IoNotificationsOffOutline, IoPersonAdd } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import { MdBlock, } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';

import CustomButton from '../../../../components/global/CustomButton';
import ContentMenuItem from '../../../../components/local/ContentMenuItem';
import { useAppSelector } from '../../../../store/hooks';
import { blockContent, followUser } from '../../../../apis/user';
import { Link as ReactLink } from 'react-router-dom';
import useAlert from '../../../../hooks/useAlert';
// import { useGlobalContext } from '../../context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ContentCardProps extends ContentFeedType { }

const ContentCard: React.FC<ContentCardProps> = (prop) => {
    const { title, createdAt, type, user, _id, coverImage, contentUrl, genre } = prop
    const me = useAppSelector(state => state.userStore.user)
    const { colors, hoverColor } = useColorMode()
    const { isOpen: isFollowing, onOpen: openFollowing, onClose: closeFollowing } = useDisclosure()
    const { isOpen: isBlocking, onOpen: openBlocking, onClose: closeBlocking } = useDisclosure()
    const cardStyle = useAppSelector(state => state.settingStore.cardStyle)
    const token = useAppSelector(state => state.userStore.token)
    const { showAlert } = useAlert()

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

    return (
        <>
            <Card w={"100%"}
                {...cardTheme[cardStyle]}
                as={"section"}
            >
                <CardHeader p={2}>
                    <HStack alignItems={"center"}>
                        <HStack as={ReactLink} to={"/profile/" + user?.username} spacing={2}>
                            <Avatar name={"psquare"} />
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

                <CardBody px={2} pt={0} position={"relative"}>
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
                                <audio controls preload='metadata' src={contentUrl} style={{ width: "100%" }}></audio>
                            </Box>
                        </Box>
                    )}
                </CardBody>

                <CardFooter px={2} pt={0}>
                    <Stack w={"full"} spacing={1}>
                        <Heading size={"sm"} color={colors.TEXT_WHITE}>{title}</Heading>
                        <HStack>
                            <Text fontSize={"xs"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{genre?.name}</Text>
                            <Icon as={BsDot} color={"gray.500"} mx={0} />
                            <Text fontSize={"xs"} noOfLines={1} fontWeight={"medium"} color={colors.TEXT_DARK}>{dayjs(createdAt).fromNow()}</Text>
                        </HStack>
                        <HStack w={"full"} alignItems={"center"}>
                            <Spacer />
                            <CustomButton onClick={handleDownload} h={8} fontSize={"xs"} fontWeight={900} rounded={5}>Download</CustomButton>
                        </HStack>
                    </Stack>
                </CardFooter>
            </Card>
        </>
    )
}
export default ContentCard