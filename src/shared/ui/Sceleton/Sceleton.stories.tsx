import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Sceleton } from './Sceleton';

export default {
    title: 'shared/Sceleton',
    component: Sceleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sceleton>;

const Template: ComponentStory<typeof Sceleton> = (args) => <Sceleton {...args} />;

export const Normal = Template.bind({});
Normal.args = { width: '100%', height: 200 };

export const Circle = Template.bind({});
Circle.args = { width: 200, height: 100, border: '50%' };
