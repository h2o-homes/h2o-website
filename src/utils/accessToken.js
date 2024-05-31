import { storage, tokenName } from '@/config'
import cookie from 'js-cookie'

/**
 * @description
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.getItem(tokenName)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.getItem(tokenName)
        } else if ('cookie' === storage) {
            return cookie.get(tokenName)
        } else {
            return localStorage.getItem(tokenName)
        }
    } else {
        return localStorage.getItem(tokenName)
    }
}

export function setAccessToken(accessToken) {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.setItem(tokenName, accessToken)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.setItem(tokenName, accessToken)
        } else if ('cookie' === storage) {
            return cookie.set(tokenName, accessToken)
        } else {
            return localStorage.setItem(tokenName, accessToken)
        }
    } else {
        return localStorage.setItem(tokenName, accessToken)
    }
}

export function removeAccessToken() {
    if (storage) {
        if ('localStorage' === storage) {
            return localStorage.removeItem(tokenName)
        } else if ('sessionStorage' === storage) {
            return sessionStorage.clear()
        } else if ('cookie' === storage) {
            return cookie.remove(tokenName)
        } else {
            return localStorage.removeItem(tokenName)
        }
    } else {
        return localStorage.removeItem(tokenName)
    }
}
