import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentaryList } from './CommentaryList';

export default {
    title: 'entities/Сommentary/CommentaryList',
    component: CommentaryList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentaryList>;

const Template: ComponentStory<typeof CommentaryList> = (args) => <CommentaryList {...args} />;

export const Light = Template.bind({});
Light.args = {
    comments: [],
};
Light.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({}),
];

export const Dark = Template.bind({});

Dark.args = {
    comments: [],
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ }),
];
