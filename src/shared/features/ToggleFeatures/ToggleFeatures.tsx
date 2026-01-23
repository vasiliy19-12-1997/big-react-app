import { ReactElement } from 'react';
import { FeaturesType } from '@/shared/types/features';
import { getFeaturesFlags } from '../getSetFeatures';

export interface ToggleFeaturesOptions {
    name: keyof FeaturesType;
    on: ReactElement;
    off: ReactElement;
}

export function ToggleFeatures({ name, on, off }: ToggleFeaturesOptions) {
    if (getFeaturesFlags(name)) {
        return on;
    }
    return off;
}
