import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ScrollToUpButton } from './ScrollToUpButton';

export default {
    title: 'features/ScrollToUpButton',
    component: ScrollToUpButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ScrollToUpButton>;

const Template: ComponentStory<typeof ScrollToUpButton> = (args) => <ScrollToUpButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};