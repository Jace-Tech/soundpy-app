/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import AppContainer from '../../../components/global/AppContainer'
import { Avatar, HStack, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { getContentLikes } from '../../../apis/content'
import { useAppSelector } from '../../../store/hooks'
import { useParams } from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
import CustomLoader from '../../../components/global/CustomLoader'
import EmptyState from '../../../components/global/EmptyState'
import { Link } from 'react-router-dom'
import useColorMode from '../../../hooks/useColorMode'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LikesProps { }

const Likes: React.FC<LikesProps> = () => {
  const [likesData, setLikesData] = useState<LikeDataType[]>([])
  const { id } = useParams()
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclosure()
  const token = useAppSelector(state => state.userStore.token!)
  const { showAlert } = useAlert()
  const { hoverColor, colors } = useColorMode()

  const handleGetLikes = async () => {
    try {
      openLoading()
      const result = await getContentLikes(id, token.token!)
      if (!result.success) throw new Error(result.message)
      setLikesData(result.data)
    } catch (error: any) {
      showAlert(error.message)
    }
    finally {
      closeLoading()
    }
  }

  useEffect(() => {
    handleGetLikes()
  }, [id])

  return (
    <DashLayout
      hideFooter
      header={<AppBar bordered page='Content Likes' />}>
      <AppContainer pb={10} pt={4}>
        {isLoading ? (
          <CustomLoader text='Loading likes' />
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
      </AppContainer>
    </DashLayout>
  )
}

export default Likes