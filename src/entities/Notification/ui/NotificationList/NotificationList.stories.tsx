import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotificationList } from './NotificationList';

export default {
    title: 'widget/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  ThemeDecorator(Theme.LIGHT),
  StoreDecorator({ user: { authData: { /* заполняйте по необходимости */ } } })
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({ user: { authData: { /* заполняйте по необходимости */ } } })
];
