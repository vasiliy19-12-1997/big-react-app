import { Story } from '@storybook/react';
import { setFeaturesFlags } from '@/shared/features';
import { FeaturesType } from '@/shared/types/features';

export const FeatureFlagsDecorator = (feature: FeaturesType) => (StoryComponent: Story) => {
    setFeaturesFlags(feature);
    return <StoryComponent />;
};
