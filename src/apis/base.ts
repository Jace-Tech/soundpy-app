// export const BASE_URL = "https://play-server.onrender.com/api/v1"

// DEV SERVER
export const BASE_URL = "http://localhost:5100/api/v1"

// PROD SERVER
// export const BASE_URL = "https://soundpy-api.onrender.com/api/v1"


// AUTH
export const LOGIN_ENDPOINT = BASE_URL + "/auth/signin"
export const UPLOAD_ENDPOINT = BASE_URL + "/upload"

// PROFILE
export const PROFILE_UPLOAD_ENDPOINT = BASE_URL + "/profile/image"
export const PROFILE_ENDPOINT = BASE_URL + "/profile"
export const GET_USER_PROFILE_ENDPOINT = (username: string) => BASE_URL + "/profile/" + username

// GENRE
export const GENRE_ENDPOINT = BASE_URL + "/genre"

// LIKES
export const GET_CONTENT_LIKE_ENDPOINT = (id: string) =>  BASE_URL + `/content/${id}/likes` 


// COMMENT
export const COMMENT_ENDPOINT = (id: string) =>  BASE_URL +  `/content/${id}/comment` 
export const COMMENT_REPLY_ENDPOINT = (id: string) =>  BASE_URL + `/content/comment/${id}/reply` 


//CONTENT
export const POST_CONTENT_ENDPOINT = BASE_URL + "/content/create"
export const GET_CONTENT_ENDPOINT = (page: number, perPage: number, query?: string) => `${BASE_URL}/content?page=${page}&perPage=${perPage}${query ? `&${query}`: ""}`
export const GET_USER_CONTENT_ENDPOINT = (id: string, page: number, perPage: number, query?: string) => `${BASE_URL}/content/user/${id}?page=${page}&perPage=${perPage}${query ? `&${query}`: ""}`
export const GET_USER_CONTENT_USERNAME_ENDPOINT = (username: string, page: number, perPage: number, query?: string) => `${BASE_URL}/content/${username}/user?page=${page}&perPage=${perPage}${query ? `&${query}`: ""}`

// PLAYLIST
export const ADD_PLAYLIST = BASE_URL + "/playlist/"
export const GET_PLAYLIST = BASE_URL + "/playlist/user/playlist"
export const DELETE_PLAYLIST = BASE_URL + "/playlist/"

// SETTINGS
export const APP_SETTINGS_PLAYLIST = BASE_URL + "/settings"


// TRANSACTIONS
export const GET_TRANSACTIONS = (page: number, perPage: number, query?: string) => `${BASE_URL}/transaction/?page=${page}&perPage=${perPage}&${query ?? ""}`
export const GET_TRANSACTION_DETAIL = (id: string) => `${BASE_URL}/transaction/${id}`

// PAYMENT
export const PAYMENT_APPROVE_ENDPOINT = BASE_URL + "/payment/approve"
export const PAYMENT_CANCEL_ENDPOINT = BASE_URL + "/payment/cancel"
export const PAYMENT_ERROR_ENDPOINT = BASE_URL + "/payment/error"
export const PAYMENT_STAKE_ENDPOINT = BASE_URL + "/payment/stake"
export const PAYMENT_CONTENT_ENDPOINT = BASE_URL + "/payment/content"
export const PAYMENT_INCOMPLETE_ENDPOINT = BASE_URL + "/payment/incomplete"
