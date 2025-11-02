import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotificationList } from './NotificationList';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({ user: { authData: { /* заполняйте по необходимости */ } } }),
];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление1',
                    description: 'Поставьте лайк',
                },
                {
                    id: '2',
                    title: 'Уведомление2',
                    description: 'Поставьте лайк',
                },
                {
                    id: '3',
                    title: 'Уведомление3',
                    description: 'Поставьте лайк',
                },
            ],
        },
    ],
};
