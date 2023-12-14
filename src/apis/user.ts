import { BASE_URL } from "./base"

export const likeContent = async (id: any, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(`${BASE_URL}/content/${id}/react`, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

export const followUser = async (userId: any, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(`${BASE_URL}/user/${userId}/follow`, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

export const blockContent = async (id: any, token: string) => {
    try {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(`${BASE_URL}/content/${id}/block`, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

export const addComment = async (id: any, data: any, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(`${BASE_URL}/content/${id}/comment`, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}