import {
    createContext, ReactNode, useRef, useState,
} from 'react';

type GuestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
    Guesture?:GuestureType
    Spring?:SpringType
    loading?:boolean
}
const AnimationContext = createContext<AnimationContextPayload>({});
export const AnimationProvider = ({ children }:{children:ReactNode}) => {
    const Spring = useRef<SpringType>;
    const Guesture = useRef<GuestureType>;
    const [loading, setIsLoading] = useState(false);

    return (
        <AnimationContext.Provider value={}>
            {children}
        </AnimationContext.Provider>
    );
};
