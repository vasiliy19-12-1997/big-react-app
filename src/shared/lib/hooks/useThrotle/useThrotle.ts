import { useCallback, useRef } from 'react';

export function useThrotle(callback:(...args:any[])=>void, delay:number) {
    const throtleRef = useRef(false);
    return useCallback(() => {
        if (!throtleRef.current) {
            callback();
            throtleRef.current = true;
            setTimeout(() => {
                throtleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
