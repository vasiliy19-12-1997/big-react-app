import { FeaturesType } from '../types/features';

let featureFlags: FeaturesType = {};

export function setFeaturesFlags(newFeatures?: FeaturesType) {
    if (newFeatures) {
        featureFlags = newFeatures;
    }
}
export function getFeaturesFlags(flag: keyof FeaturesType) {
    return featureFlags?.[flag] ?? false;
}
