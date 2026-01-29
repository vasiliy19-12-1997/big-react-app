import { FeaturesType } from '../types/features';
import { getFeaturesFlags } from './getSetFeatures';

export interface ToggleFeaturesOptions<T> {
    name: keyof FeaturesType;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({ name, on, off }: ToggleFeaturesOptions<T>): T {
    if (getFeaturesFlags(name)) {
        return on();
    }
    return off();
}
