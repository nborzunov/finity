import { AtomEffect } from 'recoil'
import logger from 'shared/helpers/logger'

export function localStorageEffect<T>(key: string): AtomEffect<T> {
    return ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue))
        }

        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
        })
    }
}

function format(value: any) {
    if (typeof value === 'object') {
        return JSON.stringify(value)
    }
    return value
}

export function loggerEffect<T>(): AtomEffect<T> {
    return ({ onSet, node }) => {
        onSet((newValue, oldValue) => {
            logger.log(`[${node.key}]: \nold: ${format(oldValue)} \nnew:  ${format(newValue)}`)
        })
    }
}
