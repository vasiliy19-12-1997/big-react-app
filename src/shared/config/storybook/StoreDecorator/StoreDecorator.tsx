import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import { articleDetailsReducers } from '@/entities/Article';
import { addCommentFormReducers } from '@/features/AddCommentForm';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducers } from '@/features/EditableProfileCard';
import { articleDetailsReducer } from '@/pages/ArticlePageDetails';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers:ReducersList = {
    login: loginReducer,
    profile: profileReducers,
    articles: articleDetailsReducers,
    articlePageDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducers,
};
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?:ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>

);
