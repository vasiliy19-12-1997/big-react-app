import { FeaturesType } from '../types/features';
import { getFeaturesFlags } from './getSetFeatures';

export interface ToggleFeaturesOptions<T> {
    name: keyof FeaturesType;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({ name, on, off }: ToggleFeaturesOptions<T>): T {
    console.log(getFeaturesFlags(name));
    if (getFeaturesFlags(name)) {
        console.log('Feature', name, 'is ON');
        return on();
    }
    console.log('Feature', name, 'is OFF');
    return off();
}
