import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentaryCard, CommentaryCardProps } from './CommentaryCard';
import { Commentary } from '../../model/types/commentary';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

export default {
    title: 'entities/Сommentary/CommentaryCard',
    component: CommentaryCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentaryCard>;

const Template: ComponentStory<typeof CommentaryCard> = (args) => <CommentaryCard {...args} />;
const normalArgs: CommentaryCardProps = {
    comment: {
        id: '1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user: {
            id: '1',
            username: 'John Doe',
        },
    },
    isLoading: false,
};
export const Light = Template.bind({});
Light.args = normalArgs;

export const LightRedesign = Template.bind({});
LightRedesign.args = normalArgs;
LightRedesign.decorators = [FeatureFlagsDecorator({ isNewDesignEnabled: true })];

export const Dark = Template.bind({});
Dark.args = normalArgs;
Dark.decorators = [ThemeDecorator(Theme.DARK)];
