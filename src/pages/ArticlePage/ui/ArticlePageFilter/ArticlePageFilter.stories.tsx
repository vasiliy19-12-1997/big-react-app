import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticlePageFilter } from './ArticlePageFilter';

export default {
    title: 'pages/ArticlePage/ArticlePageFilter',
    component: ArticlePageFilter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlePageFilter>;

const Template: ComponentStory<typeof ArticlePageFilter> = (args) => <ArticlePageFilter {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({ user: { authData: { /* заполняйте по необходимости */ } } }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ user: { authData: { /* заполняйте по необходимости */ } } }),
];
