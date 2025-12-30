import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenceDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
