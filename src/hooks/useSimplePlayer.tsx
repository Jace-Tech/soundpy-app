import { useEffect, useRef, useState } from 'react'

interface useSimplePlayerType {
  load: (file: Blob | File) => void;
  pause: () => void;
  play: () => void;
  playFromTo: (start: number, end: number) => void;
  seek: (sec: number) => void;
  stop: () => void;
  isReady: boolean;
  duration: number;
  currentTime: string;
  playing: boolean;
}

type PlayerOptions = {
  duration?: number,
  handleUpdate?: (player: any) => void;
}

const useSimplePlayer = (options?: PlayerOptions): useSimplePlayerType => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(options?.duration || 0)
  const [currentTime, setCurrentTime] = useState<string>("00:00")

  const player = useRef<HTMLAudioElement | null>(null)

  const handleEnd = () => {
    setCurrentTime("00:00")
    setPlaying(false)
  }

  const handleTimeUpdate = (cb?: (player: any) => void) => {
    if(!player.current) return
    const time = player.current.currentTime
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)
    const format = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    setCurrentTime(format)
    cb?.({player, stop})
  }

  useEffect(() => {
    if(!player.current) return 
  }, [player])

  const load = (file: Blob | File) => {
    const url = URL.createObjectURL(file)
    const data = new Audio(url) 

    // AUDIO EVENTS
    data.addEventListener("ended", handleEnd)
    data.addEventListener("timeupdate", () => handleTimeUpdate(options!.handleUpdate))
    data.addEventListener("loadedmetadata", () => {
      setDuration(options?.duration ? options.duration : data.duration === Infinity ? 0 : data.duration)
      setIsReady(true)
    })

    player.current = data
  }

  const playFromTo = (start: number, end: number) => {
    stop()
    
    console.log({
      start,
      end
    })

    if(!player.current) return
    player.current.currentTime = start

    play()
    player.current.addEventListener("timeupdate", () => {
      if(!player.current) return
      console.log("CUR TIME:", player.current.currentTime)
      if(player.current.currentTime >= end) {
        stop()
      }
    })
    
  }

  const play = () => {
    if(playing) return
    setPlaying(true)
    player.current?.play()
  }

  const pause = () => {
    if(!playing) return
    setPlaying(false)
    player.current?.pause()
  }

  const stop = () => {
    if(!player.current) return
    setPlaying(false)
    player.current.currentTime = 0
  }
  
  const seek = (seconds: number) => {
    if(!player.current) return
    player.current.currentTime = seconds
  }

  return { load, play, pause, playFromTo, seek, stop, playing, isReady, duration, currentTime }
}

export default useSimplePlayer