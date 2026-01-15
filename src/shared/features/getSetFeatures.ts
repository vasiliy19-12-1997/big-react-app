import { FeaturesType } from '../types/features';

let featureFlags: FeaturesType;

export function setFeaturesFlags(newFeatures?: FeaturesType) {
    if (newFeatures) {
        console.log(newFeatures);
        featureFlags = newFeatures;
    }
}
export function getFeaturesFlags(flag: keyof FeaturesType) {
    return featureFlags?.[flag];
}
