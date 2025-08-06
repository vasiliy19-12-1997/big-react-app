import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { AddCommentForm } from 'features/AddCommentForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Text = Template.bind({});
Text.args = {};
Text.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({ addCommentForm: { text: 'Vasya' } }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({ addCommentForm: { error: 'ERROR' } }),
];

export const TextDark = Template.bind({});
TextDark.args = {};
TextDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ addCommentForm: { text: 'Vasya dark' } }),
];

export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ addCommentForm: { error: 'ERROR dark' } }),
];
