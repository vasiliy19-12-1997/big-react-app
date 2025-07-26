import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArtcileImageBlockComponent } from './ArtcileImageBlockComponent';

export default {
    title: 'widget/ArtcileImageBlockComponent',
    component: ArtcileImageBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArtcileImageBlockComponent>;

const Template: ComponentStory<typeof ArtcileImageBlockComponent> = (args) => <ArtcileImageBlockComponent {...args} />;

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
