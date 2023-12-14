
export const MAX_DEPTH = 999
export const DEV_MODE = false
export const MAX_DISPLAY_TIME = 1.5

export const KB = 1024 
export const MB = 1024 * KB 
export const GB = 1024 * MB

export const MAX_VIDEO_SIZE = 1024 * 1024 * 1024 // (1gb)
export const MIN_VIDEO_SIZE = 5 * 1024 * 1024 // (5mb)

export const MAX_AUDIO_SIZE = 100 * 1024 * 1024 // (100mb)
export const MIN_AUDIO_SIZE = 500 * 1024 // (500kb)

export const DEFAULT_USER: UserData = {
  _id: "test-1234",
  username: "@raphhell",
}

export const DEFAULT_MAX_MESSAGES = 20
export const DEAFULT_HEADER_HEIGHT = 57
export const WALLET_CAP_HEIGHT = DEAFULT_HEADER_HEIGHT + 220