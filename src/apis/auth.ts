import { LOGIN_ENDPOINT, PROFILE_ENDPOINT, PROFILE_UPLOAD_ENDPOINT } from "./base"

export const loginUser = async (data: AuthResult) => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const request = await fetch(LOGIN_ENDPOINT, options)
    const response = await request.json()

    return response
  } catch (error: any) {
    console.log("ERROR:", error.message)
    return { message: error.message, success: false, data: null }
  }
}

export const updateProfilePicture = async (data: { name: string; image: string }, token: string) => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(PROFILE_UPLOAD_ENDPOINT, options)
    const response = await request.json()

    return response
  } catch (error: any) {
    console.log("ERROR:", error.message)
    return { message: error.message, success: false, data: null }
  }
}

export const updateProfile = async (data: any, token: string) => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const request = await fetch(PROFILE_ENDPOINT, options)
    const response = await request.json()

    return response
  } catch (error: any) {
    console.log("ERROR:", error.message)
    return { message: error.message, success: false, data: null }
  }
}