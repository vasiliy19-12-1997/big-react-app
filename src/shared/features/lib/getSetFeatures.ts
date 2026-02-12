import { FeaturesType } from '../../types/features';

let featureFlags: FeaturesType = {};
// context
// state
// reload page
// костыль
export function setFeaturesFlags(newFeatures?: FeaturesType) {
    if (newFeatures) {
        featureFlags = newFeatures;
    }
}
export function getFeaturesFlags(flag: keyof FeaturesType) {
    return featureFlags?.[flag] ?? false;
}

export function getAllFeatureFlags() {
    return featureFlags;
}
