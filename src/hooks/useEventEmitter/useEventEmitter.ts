


import { DependencyList, useCallback, useContext, useEffect } from 'react'
import { EventEmitterContext } from './EventEmitterRC'
import { BaseEvents } from './EventEmitter'

function emit<Events extends BaseEvents>() {
    const em = useContext(EventEmitterContext)
    return useCallback(
        <E extends keyof Events>(type: E, ...args: Events[E]) => {
            em.emit(type, ...args)
        },
        [em],
    )
}

function useEventEmitter<Events extends BaseEvents>() {
    const useEmit = emit()
    return {
        useListener: <E extends keyof Events>(
            type: E,
            listener: (...args: Events[E]) => void,
            deps: DependencyList = [],
        ) => {
            const em = useContext(EventEmitterContext)
            useEffect(() => {
                em.add(type, listener)
                return () => {
                    em.remove(type, listener)
                }
            }, [listener, type, ...deps])
        },
        useEmit,
    }
}
export default useEventEmitter