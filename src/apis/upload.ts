import { POST_CONTENT_ENDPOINT } from "./base"

export const uploadPostContent = async (data: FormData, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: data,
            // body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(POST_CONTENT_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}
