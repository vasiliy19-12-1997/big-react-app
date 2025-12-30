import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
    const timerRef = useRef() as MutableRefObject<any>;
    return useCallback(
        (...args: T) => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
