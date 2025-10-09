import { ComponentMeta, ComponentStory } from '@storybook/react';

import AvatarIcon from '@/shared/assets/tests/avatar.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [StoreDecorator({
    login: { username: '123', password: '123' },
})];
// export const withError = Template.bind({});
// withError.args = {
//     error: 'error',
// };

// export const Loading = Template.bind({});
// Loading.args = {
//     isLoading: true,
// };
// export const Editing = Template.bind({});
// Editing.args = {
//     data: {
//         username: 'admin',
//         age: 22,
//         lastname: 'Kon',
//         first: 'Vasiliy',
//         city: 'Ekaterinburg',
//         avatar: AvatarIcon,
//     },
// };
// Editing.decorators = [StoreDecorator({
//     login: { username: '123', password: '123' },
// })];
