import { PAYMENT_APPROVE_ENDPOINT, PAYMENT_CANCEL_ENDPOINT, PAYMENT_CONTENT_ENDPOINT, PAYMENT_ERROR_ENDPOINT, PAYMENT_INCOMPLETE_ENDPOINT, PAYMENT_STAKE_ENDPOINT } from "./base"

// APPROVE PAYMENT
export const approvePayment = async (body: ApprovePaymentPayload, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(PAYMENT_APPROVE_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// STAKE PAYMENT
export const stakePayment = async (body: CompletePaymentPayload, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(PAYMENT_STAKE_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// CONTENT PAYMENT
export const contentPayment = async (body: CompletePaymentPayload, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(PAYMENT_CONTENT_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// CANCEL PAYMENT
export const cancelPayment = async (paymentId: string, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify({ paymentId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(PAYMENT_CANCEL_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// PAYMENT ERROR
export const paymentError = async (payment: PaymentDTO, token: string) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify({ payment }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const request = await fetch(PAYMENT_ERROR_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}

// PAYMENT ERROR
export const incompletePayment = async (payment: PaymentDTO) => {
    try {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify({ payment }),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const request = await fetch(PAYMENT_INCOMPLETE_ENDPOINT, options)
        const response = await request.json()
        return response
    } catch (error: any) {
        console.log("ERROR:", error.message)
        return { message: error.message, success: false, data: null }
    }
}