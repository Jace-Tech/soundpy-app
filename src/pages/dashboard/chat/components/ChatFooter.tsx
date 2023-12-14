/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import FooterBase from '../footer_variants/FooterBase'
import ResourceFooter from '../footer_variants/ResourceFooter'
import AudioFooter from '../footer_variants/AudioFooter'
import ImageFooter from '../footer_variants/ImageFooter'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatFooterProps { }

const ChatFooter: React.FC<ChatFooterProps> = () => {
  // const { colors, hoverColor } = useColorMode()
  const [currentState, setCurrentState] = useState<CurrentStateType>("base")

  const [imagePickerData, setImagePickerData] = useState<File | null>(null)
  const [resourcePickerData, setResourcePickerData] = useState<Blob | null>(null)
  const [voiceRecordData, setVoiceRecordData] = useState<Blob | null>(null)

  const handleChangeState = (state: CurrentStateType) => {
    setCurrentState(state)
  }

  useEffect(() => {
    console.log("CURRENT STATE:", currentState)
    console.log("voiceRecordData:", voiceRecordData)
  }, [currentState, voiceRecordData])

  const handleSetData = (file: Blob | File | null, type: CurrentStateType, state: CurrentStateType) => {
    if(!type) return
    handleChangeState(state)
    switch(type) {      
      case "camera":
        return setImagePickerData(file as File)
      
      case "record":
        return setVoiceRecordData(file) 
      
      case "resource":
        return setResourcePickerData(file) 
    }
  }

  return currentState === "record" ? <AudioFooter setData={handleSetData} handleChangeState={handleChangeState} /> 
    : currentState === "camera" ? <ImageFooter file={imagePickerData as File} handleChangeState={handleChangeState} /> 
    : currentState === "resource" ? <ResourceFooter setData={handleSetData} resourceFile={resourcePickerData} />
    : <FooterBase setData={handleSetData} handleChangeState={handleChangeState} />
}

export default ChatFooter