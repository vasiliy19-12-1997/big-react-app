import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { FeaturesType } from '../../types/features';

const defaultFeatures: FeaturesType = {
    isNewDesignEnabled: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

let featureFlags: FeaturesType = {
    ...defaultFeatures,
};
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
