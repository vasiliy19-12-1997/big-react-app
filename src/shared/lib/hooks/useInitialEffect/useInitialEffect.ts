import { DependencyList, useEffect } from 'react';

export function useInitialEffect(callback: () => void, deps?: DependencyList) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line
    }, deps || []);
}
