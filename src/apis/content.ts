import { APP_SETTINGS_PLAYLIST, COMMENT_REPLY_ENDPOINT, GET_CONTENT_ENDPOINT, GET_CONTENT_LIKE_ENDPOINT, GET_CONTENT_REACTION, GET_DELETE_CONTENT_ENDPOINT, GET_USER_CONTENT_ENDPOINT, GET_USER_CONTENT_USERNAME_ENDPOINT } from "./base"


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


// POST COMMENT REPLY
export const postReply = async (token: string, id: string, comment: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify({ comment }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(COMMENT_REPLY_ENDPOINT(id), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}



// GET ALL CONTENT POST
export const getUserContent = async (id: string, token: string, page: number = 1, perPage: number = 12, query?: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_USER_CONTENT_ENDPOINT(id, page, perPage, query), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}


// GET ALL CONTENT POST
export const getReaction = async (id: string, token: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_CONTENT_REACTION(id), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}


// HANDLE DELETE CONTENT 
export const deleteContent = async (id: string, token: string) => {
    try {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_DELETE_CONTENT_ENDPOINT(id), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// GET ALL CONTENT POST
export const getUserContentByUsername = async (username: string, token: string, page: number = 1, perPage: number = 12, query?: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_USER_CONTENT_USERNAME_ENDPOINT(username, page, perPage, query), options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}


// GET ALL CONTENT POST
export const getContentLikes = async (id: string, token: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_CONTENT_LIKE_ENDPOINT(id), options)
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