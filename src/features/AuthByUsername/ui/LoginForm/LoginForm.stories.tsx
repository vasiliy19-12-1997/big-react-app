import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [StoreDecorator({
    login: { username: '123', password: '123' },
})];
export const withError = Template.bind({});
withError.args = {

};
withError.decorators = [StoreDecorator({
    login: { username: '123', password: '123', error: 'error' },
})];
export const Loading = Template.bind({});
Loading.args = {

};
Loading.decorators = [StoreDecorator({
    login: {
        username: '123', password: '123', isLoading: true,
    },
})];
