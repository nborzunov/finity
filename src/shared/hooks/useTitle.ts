export interface UseTitleOptions {
    restoreOnUnmount?: boolean
    deps?: any[]
}

function useTitle() {
    return (title: string) => {
        if (document.title !== title) document.title = title
    }
}

export default useTitle
