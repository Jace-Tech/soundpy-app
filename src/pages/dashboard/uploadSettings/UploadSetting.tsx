/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import DashLayout from '../../../components/global/DashLayout'
import AppBar from '../../../components/global/AppBar'
import useColorMode from '../../../hooks/useColorMode'
import { AspectRatio, Box, Center, Flex, FormControl, FormHelperText, FormLabel, Icon, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import AppContainer from '../../../components/global/AppContainer'
import { RxCross1 } from "react-icons/rx"
import { useUploadContext } from '../../../context/UploadContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FileLoader from '../../../components/local/FileLoader'
import useFilePicker from '../../../hooks/useFilePicker'
import { IoCamera } from 'react-icons/io5'
import CustomInput from '../../../components/local/CustomInput'
import CustomButton from '../../../components/global/CustomButton'
import PriceComponent from './components/PriceComponent'
import { DEAFULT_HEADER_HEIGHT } from '../../../utils/constant'
import ChatAudioPlayer from '../chat/components/ChatAudioPlayer'
import useSimplePlayer from '../../../hooks/useSimplePlayer'
import { uploadPostContent } from '../../../apis/upload'
import { useGlobalContext } from '../../../context'
import { useAppSelector } from '../../../store/hooks'
import StakePriceModal from '../../../components/modals/StakePriceModal'
import useAlert from '../../../hooks/useAlert'
import usePayment from '../../../hooks/usePayment'
import { getAppSettings } from '../../../apis/content'
import { stakePayment } from '../../../apis/payment'
import { getGenres } from '../../../apis/genre'
import CustomLoader from '../../../components/global/CustomLoader'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UploadSettingProps { }

const UploadSetting: React.FC<UploadSettingProps> = () => {
  const { colors, hoverColor } = useColorMode()
  const token = useAppSelector(state => state.userStore.token)
  const { handleCancelUpload, contentType, contentFile } = useUploadContext()
  const { control, getValues, reset, formState: { isValid } } = useForm({ mode: "onTouched" })
  const navigate = useNavigate()
  const { handleOpenFilePicker, file, processedData, isLoading, setFile } = useFilePicker([".jpg", ".png"], "dataUrl")
  const { load, duration } = useSimplePlayer()
  const { openLoading, closeLoading } = useGlobalContext()
  const [shouldShow, setShouldShow] = useState(true)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { showAlert } = useAlert()
  const { handlePiPayment, isPaying } = usePayment()
  const [settings, setSettings] = useState<AppSettingsData>()
  const [genres, setGenres] = useState<GenreType[]>([])
  const { onOpen: openFetching, onClose: closeFetching } = useDisclosure()
  const [videoUrl, setVideoUrl] = useState<string>()

  const handleGetVideo = async () => {
    if(contentType !== "music-video") return
    const blob = new Blob([(contentFile as File)], { type: contentFile?.type })
    const url = URL.createObjectURL(blob)

    console.log("URL:", url)
    setVideoUrl(url)
  }


  const getSettings = async () => {
    if (!token) return
    try {
      openLoading()
      const result = await getAppSettings(token.token)
      console.log(result)
      if (!result.success) throw new Error(result.message)
      setSettings(result.data)
    }
    catch (error: any) {
      console.log("ERROR[SETTINGS]:", error.message)
    }
    finally {
      closeLoading()
    }
  }

  useEffect(() => {
    getSettings()
  }, [])

  useEffect(() => {
    if (!contentFile) return
    load(contentFile)
  }, [contentFile])


  useEffect(() => {
    if (!contentType || !contentFile) navigate(-1)
  }, [])


  useEffect(() => {
    const id = setTimeout(() => {
      setShouldShow(false)
    }, 3000)
    console.log(duration)
    return () => clearTimeout(id)
  }, [duration])


  const handlePlayTime = (obj: any) => {
    const cTime = obj.player.current.currentTime
    console.log("TIME", cTime)
  }

  const acceptContent = () => {
    // CHECK IF HAS PAID ALREADY
    const hasPaid = sessionStorage.getItem("HAS_PAID")
    if(hasPaid) {
      const payload = JSON.parse(hasPaid)
      return uploadContent(payload)
    }
    // HANDLE PAYMENT HERE
    const amount = settings?.stakePrice
    handlePiPayment(amount, `Stake price for ${getValues("title")}`, "stake", { stakePrice: settings?.stakePrice }, async (paymentId, txid, openPaying, closePaying) => {
      try {
        openPaying()
        const result = await stakePayment({ paymentId, txid }, token.token)
        if (!result.success) throw new Error(result.message)
      // SET SESSION DATA
        sessionStorage.setItem("HAS_PAID", JSON.stringify({ paymentId, txid }))
        uploadContent({ paymentId, txid })
      } catch (error: any) {
        showAlert(error.message, "error")
      }
      finally {
        closePaying()
        onClose()
      }
    })
  }

  const handleButtonClick = () => {
    // const shouldHide = Storage.getItem(APP_HIDE_ACCEPT_MODAL)
    // if (!shouldHide || shouldHide === "false") {
      // onOpen()
      //   Storage.setItem(APP_HIDE_ACCEPT_MODAL, ("" + isChecked))
      // }
    onOpen()
  }

  const uploadContent = async ({ paymentId, txid }) => {
    try {
      openLoading()
      const data = {
        ...getValues(),
        features: getValues("features").split(","),
        coverImage: file,
        type: contentType,
        paymentId,
        txid,
        metadata: {},
        file: contentFile
      }

      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const result = await uploadPostContent(formData, token?.token! as string)
      console.log("RESULT:", result)
      if (!result.success) throw new Error(result.message)
      showAlert(result.message, "success")

      sessionStorage.removeItem("HAS_PAID")

      reset()
      closeLoading()
      navigate("/home", { replace: true })
    }
    catch (error: any) {
      showAlert(error.message, "error")
    }
    finally {
      closeLoading()
    }
  }

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
    handleGetVideo()
  }, [])

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <DashLayout
      capHeight={DEAFULT_HEADER_HEIGHT}
      hideFooter
      header={<AppBar
        borderBottomWidth={1}
        borderColor={colors.DIVIDER}
        page='Upload Settings'
        RightElement={
          <IconButton
            aria-label='back'
            size={"sm"}
            _hover={{ bg: "transparent" }}
            color={colors.TEXT_GRAY}
            fontSize={"lg"}
            onClick={handleCancelUpload}
            variant={"ghost"}
            icon={<RxCross1 />}
          />
        }
      />}
    >
      <AppContainer py={8}>
        <Stack spacing={4}>
          {shouldShow && <FileLoader file={contentFile!} />}
          <Box pb={4} mt={3} borderBottom={`1px solid ${colors.DIVIDER}`} >
            <Text color={colors.TEXT_WHITE} fontWeight={"bold"} fontSize={"sm"} mb={4}>Preview</Text>
            {contentType === "music-video" ? videoUrl ? (
              <video controls src={videoUrl} height={200} style={{ width: "100%" }}></video>
            ) : (
              <CustomLoader alignItems={"center"} justifyContent={"center"} text='Processing data' />
            )
              : (
                <ChatAudioPlayer file={new Blob([(contentFile as File)], { type: contentFile?.type })} handleUpdate={handlePlayTime} />
              )}
          </Box>
          <FormControl borderBottom={`1px solid ${colors.DIVIDER}`} pb={4}>
            <FormLabel color={colors.TEXT_WHITE} fontWeight={"bold"} fontSize={"sm"}>Upload artwork</FormLabel>
            {!file ? (
              <Center cursor={"pointer"} onClick={() => handleOpenFilePicker()} h={250} maxW={250} bgColor={hoverColor}>
                <Icon color={colors.TEXT_WHITE} as={IoCamera} fontSize={"3xl"} />
              </Center>
            ) : (
              <Box pos={"relative"} w={"fit-content"}>
                <AspectRatio ratio={4 / 4} h={250} w={250}>
                  <Image src={processedData} alt='Artwork' />
                </AspectRatio>

                <Flex justifyContent={"flex-end"} h={"100%"} w={"100%"} bg={hoverColor} p={3} pos={"absolute"} top={0} left={0}>
                  <IconButton
                    shadow={"dark-lg"}
                    size={"xs"}
                    onClick={() => setFile(null)}
                    aria-label='cancel'
                    colorScheme='red'
                    icon={<RxCross1 />}
                  />
                </Flex>
              </Box>
            )}
            <FormHelperText fontSize={"xs"} color={colors.TEXT_GRAY}>Dimensions: 500/500, Type: JPG, PNG</FormHelperText>
          </FormControl>

          <PriceComponent control={control} />


          <CustomInput
            control={control}
            name='title'
            label='Song title'
            InputProps={{ outline: "none", borderColor: colors.DIVIDER }}
            rules={{ required: "Song title is required" }}
          />

          <CustomInput
            control={control}
            name='features'
            label='Featuring'
            info='Separate names with commas'
            InputProps={{ outline: "none", borderColor: colors.DIVIDER, placeholder: "eg: Omah lay, Rema" }}
          />

          <CustomInput
            isSelect
            control={control}
            name='genre'
            selectOptions={genres.map(item => ({ label: item.name, value: item._id }))}
            label='Genre'
            InputProps={{ outline: "none", borderColor: colors.DIVIDER, color: colors.TEXT_WHITE }}
            rules={{ required: "Genre is required" }}
          />

          <StakePriceModal isChecked={isChecked} setIsChecked={setIsChecked} settings={settings} isLoading={isPaying} handleAction={acceptContent} isOpen={isOpen} onClose={onClose} />

          <CustomButton onClick={handleButtonClick} isDisabled={!isValid} size={"lg"} my={8}>Upload</CustomButton>
        </Stack>
      </AppContainer>
    </DashLayout >
  )
}

export default UploadSetting