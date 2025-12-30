import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

type GuestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
    Guesture?: GuestureType;
    Spring?: SpringType;
    loaded?: boolean;
}
const getAsyncAnimationModules = async () => {
    return Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);
};

const AnimationContext = createContext<AnimationContextPayload>({});
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const GuestureRef = useRef<GuestureType>();
    const SpringRef = useRef<SpringType>();
    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Guesture]) => {
            SpringRef.current = Spring;
            GuestureRef.current = Guesture;
            setIsLoaded(true);
        });
    }, []);
    const value = useMemo(
        () => ({
            Spring: SpringRef.current,
            Guesture: GuestureRef.current,
            loaded,
        }),
        [loaded],
    );
    return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
export const useAnimationLibs = () => {
    const libs = useContext(AnimationContext) as Required<AnimationContextPayload>;
    if (!libs) {
        throw new Error('Ошибка при загрузке @use-gesture/react и @react-spring/web');
    }
    return libs;
};
