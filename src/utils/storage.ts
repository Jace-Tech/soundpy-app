import { isEmpty } from "./helper"

export const APP_STORAGE_NAME = "PLAY_MUSIC_STORE"


export const APP_MODE_KEY = "APP_MODE_KEY"
export const APP_USER_KEY = "APP_USER_KEY"
export const APP_SHOW_AMOUNT_KEY = "APP_SHOW_AMOUNT_KEY"
export const APP_HIDE_ACCEPT_MODAL = "APP_SHOW_ACCEPT_MODAL"

export const APP_FIRST_TIME_USER = "APP_FIRST_TIME_USER"
export const APP_CARD_STYLE = "APP_CARD_STYLE"

export class Storage {

  static #getStore(){
    const store = localStorage.getItem(APP_STORAGE_NAME)
    if (!store) return {}
    return JSON.parse(store)
  }
  
  static setItem(key: string, value: string) {
    // ADD ITEM TO STORE
    const store = {
      ...this.#getStore(),
      [key]: value
    }

    // UPDATE STORE 
    this.#updateStore(store)
  }

  static #updateStore(store: any) {
    localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(store))
  }

  /**
   * The function retrieves an item from a store based on a given key.
   * @param {string} key - The key parameter is a string that represents the key of the item you want
   * to retrieve from the store.
   * @returns The item with the specified key from the store.
   */
  static getItem(key: string) {
    // GET PREV STORE
    const store = this.#getStore()
    if(isEmpty(store)) return 

    // GET ITEM FROM STORE
    return store[key]
  }

  /**
   * The function deletes an item from the store based on a given key.
   * @param {string} key - The key parameter is a string that represents the key of the item you want
   * to delete from the store.
   */
  static removeItem(key: string) {
    // Get the store
    const store = this.#getStore()

    // Check if the key exists in store
    if(!(key in store)) return 
    delete store[key]

    // Update Storage
    this.#updateStore(store)
  }
}