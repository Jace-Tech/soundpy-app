/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { convertNumber, handleFileUploadError } from '../utils/helper'
import { useUploadContext } from '../context/UploadContext';

interface useFilePickerType {
  file: File | null;
  setFile: (file: File | null) => void;
  handleOpenFilePicker: (cb?: (file: Blob) => void) => void;
  setProcessedData: (data: any) => void;
  fileState: { value: number, total: number} | null;
  isLoading: boolean;
  isDone: boolean;
  processedData: any;
  blob: Blob | null;
  error: { message: string, error: string} | null;
}

type ProcessType = "dataUrl" | "arrayBuffer" | "text" | "binaryString"
const useFilePicker = (type?: string[], processType?: ProcessType): useFilePickerType => {
  const [file, setFile] = useState<File | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [processedData, setProcessedData] = useState<any>(null)
  const [error, setError] = useState<{ message: string, error: string} | null>(null)
  const [fileState, setFileState] = useState<{ value: number, total: number} | null>(null)
  const { contentType } = useUploadContext()

  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading} = useDisclosure()
  const { isOpen: isDone, onOpen: openDone, onClose: closeDone } = useDisclosure()


  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>, cb?: (file: Blob) => void) => {
    const file = e.target?.files?.[0] as File
    const blob = new Blob([file], { type: file.type })
    setBlob(blob)    
    const uploadError = handleFileUploadError(file!, contentType)  
    if (uploadError) return setError(uploadError)

    console.log({file})
    setFile(file as File) 
    setError(null)
    processType && handleProcessFile(file as File)

    cb?.(blob)
  }

  const handleProcessFile = (_file: File) => {
    const reader = new FileReader()
    _file ??= file as File
    
    reader.addEventListener("loadstart", () => {
      closeDone()
      openLoading()
    })

    reader.addEventListener("progress", (e: ProgressEvent<FileReader>) => {
      setFileState({ total: convertNumber(e.total)[0], value: convertNumber(e.loaded)[0] })
    })

    reader.addEventListener("loadend", (e: ProgressEvent<FileReader>) => {
      setFileState({ total: convertNumber(e.total)[0], value: convertNumber(e.total)[0] })
      closeLoading()
      openDone()
      setProcessedData(e.target?.result)
    })

    switch(processType) {
      case "arrayBuffer":
        reader.readAsArrayBuffer(_file!)
        break;

      case "binaryString":
        reader.readAsBinaryString(_file!)
        break;

      case "dataUrl":
        reader.readAsDataURL(_file!)
        break;

      case "text":
        reader.readAsText(_file!)
        break;
    }
  }

  const handleOpenFilePicker = (cb?: (file: Blob) => void) => {
    const inputElem = document.createElement("input")
    inputElem.type = "file"
    inputElem.accept = type ? type.join(",") : "audio/*"
    inputElem.hidden = true
    inputElem.click()
    inputElem.addEventListener("change", (e: any) => handleSetFile(e, cb))
  }

  return { file, handleOpenFilePicker, setFile, fileState, isLoading, isDone, processedData, error, setProcessedData, blob }
}

export default useFilePicker