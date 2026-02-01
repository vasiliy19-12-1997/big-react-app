import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 4,
};
export const RowStart = Template.bind({});
RowStart.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 4,
    justify: 'start',
};
export const RowEnd = Template.bind({});
RowEnd.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 4,
    justify: 'end',
};
export const Column = Template.bind({});
Column.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    direction: 'column',
};
export const ColumnEnd = Template.bind({});
ColumnEnd.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    direction: 'column',
    align: 'end',
};
export const ColumnStart = Template.bind({});
ColumnStart.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    direction: 'column',
    align: 'start',
};
export const RowGap4 = Template.bind({});
RowGap4.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 4,
};
export const RowGap8 = Template.bind({});
RowGap8.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 8,
};
export const RowGap16 = Template.bind({});
RowGap16.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 16,
};
export const RowGap32 = Template.bind({});
RowGap32.args = {
    children: (
        <>
            <div>vasya1</div>
            <div>vasya2</div>
            <div>vasya3</div>
            <div>vasya4</div>
            <div>vasya5</div>
        </>
    ),
    gap: 32,
};
