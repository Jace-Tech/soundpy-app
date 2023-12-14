import { ADD_PLAYLIST } from "./base"

export const addToPlaylist = async (content: string, token: string) => {
    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const request = await fetch(ADD_PLAYLIST, options)
      const response = await request.json()
  
      return response
    } catch (error: any) {
      console.log("PLAYLIST ERROR:", error.message)
      return { message: error.message, success: false, data: null }
    }
  }