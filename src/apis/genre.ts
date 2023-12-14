import { GENRE_ENDPOINT } from "./base"

export const getGenres = async (token: string) => {
    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const request = await fetch(GENRE_ENDPOINT, options)
      const response = await request.json()
  
      return response
    } catch (error: any) {
      return { message: error.message, success: false, data: null }
    }
  }
  