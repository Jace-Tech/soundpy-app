import { GET_TRANSACTIONS, GET_TRANSACTION_DETAIL } from "./base"


export const getUsersTransactions = async (token: string, page = 1, perPage = 12, query?: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_TRANSACTIONS(page, perPage, query), options)
        const response = await request.json()

        return response
    } catch (error: any) {
        console.log("TRANSACTION ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

export const getTransactionsDetails = async (id: string, token: string) => {
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(GET_TRANSACTION_DETAIL(id), options)
        const response = await request.json()

        return response
    } catch (error: any) {
        console.log("TRANSACTION ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}