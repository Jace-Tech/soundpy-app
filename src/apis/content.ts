import { APP_SETTINGS_PLAYLIST, GET_CONTENT_ENDPOINT, GET_USER_CONTENT_ENDPOINT } from "./base"


// GET ALL CONTENT POST
export const getPostContent = async (token: string,  page: number = 1, perPage: number = 12, query?: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_CONTENT_ENDPOINT(page, perPage, query), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// GET ALL CONTENT POST
export const getUserContent = async (token: string, page: number = 1, perPage: number = 12, query?: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_USER_CONTENT_ENDPOINT(page, perPage, query), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// GET ALL SETTINGS
export const getAppSettings = async (token: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(APP_SETTINGS_PLAYLIST, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}