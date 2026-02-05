import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileCardDeprecated } from './ProfileCardDeprecated';

export default {
    title: 'widget/ProfileCardDeprecated',
    component: ProfileCardDeprecated,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => <ProfileCardDeprecated {...args} />;

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
