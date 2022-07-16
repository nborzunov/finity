export async function getCurrentHookValue<T>(setHookFunction: any): Promise<T> {
    return new Promise((resolve) => {
        setHookFunction((prev: T) => {
            resolve(prev)
            return prev
        })
    })
}
