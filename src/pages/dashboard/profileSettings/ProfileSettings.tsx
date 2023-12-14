/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react'
import AppBar from '../../../components/global/AppBar'
import { Avatar, AvatarBadge, Box, Button, Center, CircularProgress, IconButton, Link, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import useColorMode from '../../../hooks/useColorMode'
import { AiFillCamera } from "react-icons/ai"
import AppContainer from '../../../components/global/AppContainer'
import CustomInput from '../../../components/local/CustomInput'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { MAX_DEPTH } from '../../../utils/constant'
import { getFileUrl } from '../../../utils/helper'
import { updateUser } from '../../../store/slices/userSlice'
import { useGlobalContext } from '../../../context'
import { useNavigate } from 'react-router-dom'
import { updateProfile, updateProfilePicture } from '../../../apis/auth'
import { getGenres } from '../../../apis/genre'


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileSettingsProps { }

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const { colors } = useColorMode()
  const userData = useAppSelector(state => state.userStore.user)
  const token = useAppSelector(state => state.userStore.token)
  const { isLoading, openLoading, closeLoading } = useGlobalContext()
  const { isOpen: isFetching, onOpen: openFetching, onClose: closeFetching } = useDisclosure()
  const [genres, setGenres] = useState<GenreType[]>([])

  const toast = useToast({ isClosable: true, position: "top", duration: 6000, containerStyle: { zIndex: MAX_DEPTH + 10 } })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { control, getValues } = useForm({ mode: "onTouched" })

  const bgInputRef = useRef(null)
  const avaterInputRef = useRef(null)


  const fetchGenres = async () => {
    if (!token) return
    try {
      openFetching()
      const result = await getGenres(token.token!)
      if (!result.success) throw new Error(result.message)
      setGenres(result.data)
    }
    catch (e: any) {
      console.log("ERROR:", e.massage)
    }
    finally {
      closeFetching()
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const handleImageUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    openLoading()
    const name = (e.target as any).name
    const imageData = await getFileUrl((e.target as any).files[0])

    const result = await updateProfilePicture({ name, image: imageData as string }, token?.token! as string)
    if (!result) {
      toast({
        description: result.message,
        status: "error",
      })
      closeLoading()
      return
    }
    dispatch(updateUser(result.data))
    toast({
      description: result.message,
      status: "success",
    })
    closeLoading()
  }

  const handleUpdateData = async () => {
    const data = getValues()
    const result = await updateProfile(data, token?.token! as string)
    console.log("RESULT:", result)
    if (!result.success) {
      toast({
        description: result.message,
        status: "error",
      })
      return
    }
    dispatch(updateUser(result.data))
    toast({
      description: result.message,
      status: "success",
    })
    closeLoading()
    navigate("/profile/" + userData?.username, { replace: true })
  }



  return (
    <Box h={"100vh"} bg={colors.BG_COLOR} pt={10} onScroll={() => console.log(window.scrollY)}>
      <AppBar
        pos={"fixed"}
        page="Profile Settings"
        RightElement={
          <Button
            size={"sm"}
            color={colors.PRIMARY_COLOR}
            variant={"link"}
            _hover={{ textDecor: "none" }}
            isLoading={isLoading}
            loadingText={"saving"}
            onClick={handleUpdateData}
          >Save</Button>
        }
      />

      <Box>
        <Center borderWidth={1} borderColor={colors.DIVIDER} h={"40"} bg={`linear-gradient(to bottom, rgba(45, 45, 45, .4), rgba(45, 45, 45, .4)), url(${userData?.coverImage})`} bgRepeat={"no-repeat"} bgSize={"cover"} bgPosition={"center center"}>
          <input hidden name='coverImage' onChange={handleImageUpload} type="file" ref={bgInputRef} />
          <IconButton
            colorScheme='teal'
            variant={"ghost"}
            fontSize={"2xl"}
            icon={<AiFillCamera />}
            aria-label='cover-image'

            onClick={() => (bgInputRef.current as any).click?.()}
          />
        </Center>
        <AppContainer mt={-12}>
          <input hidden name="profileImage" onChange={handleImageUpload} type="file" ref={avaterInputRef} />
          <Avatar bg={"#555"} name={userData?.musicName || userData?.username?.slice(1)} src={userData?.profileImage} size={"xl"}>
            <AvatarBadge
              onClick={() => (avaterInputRef.current as any).click?.()}
              size={"sm"}
              as={IconButton}
              aria-label='profileImage'
              icon={<AiFillCamera />}
            />
          </Avatar>
        </AppContainer>
      </Box>

      {isFetching ? (
        <CircularProgress isIndeterminate size={8} color='gray.400' />
      ) : !genres ? (
        <AppContainer>
          <Stack>
            <Text fontSize={"sm"} color={colors.TEXT_DARK}>Failed to load some data. Check you internet connection and try again. </Text>
            <Link href='' fontSize={"sm"}>Reload page</Link>
          </Stack>
        </AppContainer>
      ) : (
        <AppContainer mt={6}>
          <Stack spacing={4} pb={10}>
            <CustomInput
              info="You can only change your music name once a year, Please make sure you're putting your real music name"
              control={control}
              name={"musicName"}
              value={userData?.musicName}
              rules={{ required: "Music name is required", minLength: { value: 3, message: "Music name must be at least 3 characters" } }}
              label={"Music name"}
            />

            <CustomInput
              control={control}
              name={"country"}
              value={userData?.country}
              rules={{ required: "Country is required" }}
              isSelect
              selectOptions={[
                { value: "nigeria", label: "Nigeria" },
                { value: "ghana", label: "Ghana" },
                { value: "south africa", label: "South Africa" },
              ]}
              label={"Country"}
            />

            <CustomInput
              control={control}
              name={"bio"}
              rules={{ required: false }}
              isTextArea
              value={userData?.bio}
              label={"Bio"}
            />

            <CustomInput
              control={control}
              name={"musicCareer"}
              rules={{ required: "Music Career is required" }}
              value={userData?.musicCareer}
              isSelect
              selectOptions={[
                { value: "producer", label: "Producer" },
                { value: "artist", label: "Artist" },
                { value: "music lover", label: "Music Lover" },
              ]}
              label={"Music career"}
            />

            <CustomInput
              control={control}
              name={"genre"}
              value={userData?.genre?.name}
              rules={{ required: "Music genre is required" }}
              isSelect
              selectOptions={genres.map(item => ({ label: item.name, value: item._id }))}
              label={"Music genre"}
            />
          </Stack>
        </AppContainer>

      )}

    </Box >
  )
}

export default ProfileSettings