/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { useToast } from "@chakra-ui/react";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSlug, handleFileUploadError } from "../utils/helper";
import { MAX_DEPTH } from "../utils/constant";

interface UploadContextProps {
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  // isDisabled: boolean;
  toggleAgreed: () => void;
  handleCancelUpload: () => void;
  agreed: boolean;
  contentFile: File | null;
  handleOpenFilePicker: () => void;
  setContentFileUrl: (url: string | null) => void;
  contentFileUrl: string | null;
  setUploadData: (data: UploadData | null) => void;
  uploadData: UploadData | null;
}

const UploadContext = createContext({} as UploadContextProps); 

interface UploadContextProviderProps {
  children: ReactNode;
}

const UploadContextProvider: React.FC<UploadContextProviderProps> = ({ children }) => { 
  const [contentType, setContentType] = useState<ContentType>("")
  const [contentFile, setContentFile] = useState<File | null>(null)
  const [contentFileUrl, setContentFileUrl] = useState<string | null>(null)
  const [uploadData, setUploadData] = useState<UploadData | null>(null)
  // const { isOpen: agreed, onToggle: toggleAgreed, onClose: closeAgree } = useDisclosure()
  const [agreed, setAgreed] = useState<boolean>(false)
  const navigate = useNavigate()
  const toast = useToast({ isClosable: true, position: "top", duration: 6000 , containerStyle: { zIndex: MAX_DEPTH + 10 } })
  // const isDisabled = (Boolean(contentType) && agreed) === false

  const toggleAgreed = () => setAgreed(prev => !prev)

  const handleCancelUpload = () => {
    setContentType("")
    navigate("/home")
  }

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    console.log({file})
    const uploadError = handleFileUploadError(file!, contentType)
    if(uploadError) {
      toast({
        status: "error",
        title: uploadError.error,
        description: uploadError.message
      })
      return
    }
    setContentFile(file as File) 
    navigate("/upload/" + getSlug(contentType))
  }

  const handleOpenFilePicker = () => {
    const inputElem = document.createElement("input")
    inputElem.type = "file"
    inputElem.accept = contentType !== "music-video" ? ".ogg, .wav, .flag, .mp3" : ".mp4" // TODO: This should come from ADMIN
    inputElem.hidden = true
    inputElem.click()
    inputElem.addEventListener("change", handleSetFile as any)
  }

  return ( 
    <UploadContext.Provider value={{ 
      contentType,
      setContentType,
      // isDisabled,
      agreed,
      toggleAgreed,
      handleCancelUpload,
      handleOpenFilePicker,
      contentFile,
      setContentFileUrl,
      contentFileUrl,
      setUploadData,
      uploadData,
    }}> 
      {children} 
    </UploadContext.Provider> 
  )
}

export default UploadContextProvider

export const useUploadContext = () => useContext(UploadContext);