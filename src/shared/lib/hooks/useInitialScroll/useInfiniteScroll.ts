import { MutableRefObject, useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
    wrapperRef:MutableRefObject<HTMLDivElement>
    triggerRef:MutableRefObject<HTMLDivElement>
    callback?:()=>void
}
export function useInfiniteScroll(props: useInfiniteScrollProps) {
    const { wrapperRef, triggerRef, callback } = props;
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const trigger = triggerRef.current;
        if (callback) {
            const options = {
                root: wrapper,
                rootMargin: '0px',
                threshold: 1.0,
            };
            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);
            observer.current.observe(trigger);
        }
        return () => {
            if (observer) {
                observer?.current?.unobserve(trigger);
            }
        };
    }, [callback, wrapperRef, triggerRef]);
}
