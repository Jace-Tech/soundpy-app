/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { getFileUrl } from '../utils/helper';

type DataSrcType = {
  base64: string;
  objectUrl: string;
}
interface useRecordType {
  timer: { seconds: number, minutes: number };
  audio: Blob | null;
  isRecording: boolean;
  hasStopped: boolean;
  recorder: MediaRecorder | null;
  dataSrc: DataSrcType | null;
  // initiate: () => void;
  startRecord: () => void;
  pauseRecord: () => void;
  stopRecord: () => void;
  deleteRecord: () => void;
  resumeRecord: () => void;
}


const useRecord = (): useRecordType => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [timer, setTimer] = useState<{ seconds: number, minutes: number }>({ seconds: 0, minutes: 0 })
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)
  const [audio, setAudio] = useState<Blob | null>(null)
  const [dataSrc, setDataSrc] = useState<DataSrcType | null>(null)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [hasStopped, setHasStopped] = useState<boolean>(false)

  useEffect(() => {
    console.log("TIMER:", timer)
  }, [timer])

  useEffect(() => {
    (async() => {
      console.log("AUDIO:", audio)
      if(!audio) return
      const objectUrl = URL.createObjectURL(audio)
      const base64 = await getFileUrl(audio) as string

      setDataSrc({
        objectUrl,
        base64
      })
    })()
  }, [audio])

  useEffect(() => {
    console.log("RECORDING:", isRecording)
  }, [isRecording])

  useEffect(() => {
    console.log("RECORDER:", recorder)
  }, [recorder])

  // INTERNAL
  const startCounter = useCallback((initialCount = 1) => {
    let counter = initialCount
    setIntervalId(setInterval(() => {
      if (counter >= 60) {
        counter = 0
        setTimer(prev => ({ ...prev, seconds: counter, minutes: prev.minutes + 1 }))
      }
      setTimer(prev => ({ ...prev, seconds: counter }))
      counter++
    }, 1000))
  }, [])

  const stopCounter = () => {
    console.log("STOP TIMER:", intervalId)
    if (intervalId === null) return
    clearInterval(intervalId)
    console.log("TIMER STOPPED")
  }

  const stopTracks = () => {
    if(!recorder) return
    recorder.stream.getTracks().forEach(track => track.stop())
  }

  const record = () => {
    try {
      let recordedChunks: Blob[] = [];
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.onstart = () => {
          console.log("STARTED!")
          setIsRecording(true)
          startCounter()
        }

        mediaRecorder.ondataavailable = (e) => {
          console.log("RECORD DATA:", e)
          recordedChunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
          console.log("RECIEVED STOP ACTION")
          setIsRecording(false)
          setHasStopped(true)
          setAudio(new Blob(recordedChunks, { type: "audio/webm" }))
          recordedChunks = []
        }
        
        setRecorder(mediaRecorder)
      })
    }
    catch (err: any) {
      console.log("RECORD ERROR:", err?.message as string)
    }
  }

  useEffect(() => {
    record()
    return () => {
      stopCounter()
      stopTracks()
    }
  }, [])


  // EXTERNAL [THOSE TO EXPORT]

  const startRecord = () => {
    if (!isRecording && !recorder) return
    recorder?.start()
  }

  const pauseRecord = () => {
    if (!isRecording) return
    recorder?.pause()
    setIsRecording(false)
    stopCounter()
  }

  const stopRecord = () => {
    recorder?.stop()
    stopTracks()
    stopCounter()
  }

  const resumeRecord = () => {
    if (isRecording) return
    recorder?.resume()
    setIsRecording(true)
    startCounter(timer?.seconds || 1)
  }

  const deleteRecord = () => {
    if (recorder) {
      recorder.stop()
    }
    setTimer({ minutes: 0, seconds: 0 })
    setHasStopped(false)
    setIsRecording(false)
    setIntervalId(null)
    setAudio(null)
    stopTracks()
  }

  return { audio, deleteRecord, hasStopped, dataSrc, isRecording, pauseRecord, recorder, resumeRecord, startRecord, stopRecord, timer }
}

export default useRecord