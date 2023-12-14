import { Divider, HStack, Heading, Progress, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import { getMappedValue } from '../../utils/helper';
import useColorMode from '../../hooks/useColorMode';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FileLoaderProps {
  file: File;
} 

const FileLoader:React.FC<FileLoaderProps> = ({ file }) => {
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading} = useDisclosure()
  const { isOpen: isDone, onOpen: openDone, onClose: closeDone } = useDisclosure()
  const [fileState, setFileState] = useState<{ value: number, total: number} | null>()

  const { colors, hoverColor } = useColorMode()


  const getFileStats = useCallback(() => {
    if(!file) return
    const reader = new FileReader();
    
    reader.addEventListener("loadstart", () => {
      closeDone()
      openLoading()
    })

    reader.addEventListener("progress", (e: ProgressEvent<FileReader>) => {
      setFileState({ total: 100, value: getMappedValue(e.loaded, e.total) })
      // setFileState({ total: convertNumber(e.total)[0], value: convertNumber(e.loaded)[0] })
    })

    reader.addEventListener("loadend", (e: ProgressEvent<FileReader>) => {
      // setFileState({ total: convertNumber(e.total)[0], value: convertNumber(e.total)[0] })
      setFileState({ total: 100, value: getMappedValue(e.loaded, e.total) })
      closeLoading()
      openDone()
    })

    reader.readAsDataURL(file);
  }, [closeDone, closeLoading, file, openDone, openLoading])

  useEffect(() => {
    getFileStats()
  }, [getFileStats])

  return (
    <Stack p={4} rounded={"lg"} bg={hoverColor}>
      <Heading noOfLines={1} color={colors.TEXT_WHITE} size={"sm"}>{file?.name}</Heading>
      <Stack fontWeight={"semibold"} fontSize={"xs"}>
        { isDone ? (
          <HStack justifyContent={"flex-end"}>
            {/* <Text color={colors.TEXT_DARK}>{fileState?.value} &nbsp;of &nbsp;{fileState?.total} {fileState && convertNumber(fileState.total)[1]}</Text> */}
            <Text color={colors.TEXT_DARK}>{fileState?.value} &nbsp;/ 100%</Text>
            <Divider borderColor={colors.DIVIDER} h={4} orientation='vertical' />
            <Text color={colors.PRIMARY_COLOR}>completed</Text>
          </HStack>
        ): isLoading ?  (
          <HStack justifyContent={"flex-end"}>
            {/* <Text color={colors.TEXT_DARK}>{fileState?.value} &nbsp;of &nbsp; {fileState?.total} {fileState && convertNumber(fileState.total)[1]}</Text> */}
            <Text color={colors.TEXT_DARK}>{fileState?.value} &nbsp;/ 100%</Text>
            <Divider borderColor={colors.DIVIDER} h={4} orientation='vertical' />
            <Text color={colors.PRIMARY_COLOR}>loading...</Text>
          </HStack>
        ) : (
          <Text color={colors.TEXT_GRAY}>processing...</Text>
        )}
        <Progress colorScheme='teal' size={"sm"} rounded={"md"} isIndeterminate={!isDone && !isLoading} min={0} value={fileState?.value || 0} max={fileState?.total || 100}  />
      </Stack>
    </Stack>
  )
}

export default FileLoader