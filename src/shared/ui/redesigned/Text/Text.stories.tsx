import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'title',
    text: 'text',
};
export const Error = Template.bind({});
Error.args = {
    title: 'title',
    text: 'text',
    variant: 'error',
};
export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'title',
};
export const onlyText = Template.bind({});
onlyText.args = {
    text: 'text',
};
export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Text',
    text: 'text',
    size: 's',
};
export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Text',
    text: 'text',
    size: 'm',
};
export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Text',
    text: 'text',
    size: 'l',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'title',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'title',
};

onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTextDark = Template.bind({});

onlyTextDark.args = {
    text: 'text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
