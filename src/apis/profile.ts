import { GET_USER_PROFILE_ENDPOINT } from "./base"

export const getUserProfile = async (username: string, token: string) => {
    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const request = await fetch(GET_USER_PROFILE_ENDPOINT(username), options)
      const response = await request.json()
  
      return response
    } catch (error: any) {
      console.log("PROFILE ERROR:", error.message)
      return { message: error.message, success: false, data: null }
    }
  }