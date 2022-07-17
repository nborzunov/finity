import { useEffect, useRef } from 'react'

export interface UseTitleOptions {
    restoreOnUnmount?: boolean
    deps?: any[]
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
    restoreOnUnmount: false,
    deps: [],
}

function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
    const prevTitleRef = useRef(document.title)

    if (document.title !== title) document.title = title

    useEffect(() => {
        if (options && options.restoreOnUnmount) {
            return () => {
                document.title = prevTitleRef.current
            }
        } else {
            return
        }
    }, [options.deps])
}

export default typeof document !== 'undefined' ? useTitle : () => {}
