import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback:(...args:any[])=>void, delay:number) {
    const timerRef = useRef() as MutableRefObject<any>;
    return useCallback((...args) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
