import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducers } from '@/entities/Article/testing';
import { addCommentFormReducers } from '@/features/AddCommentForm/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducers } from '@/features/EditableProfileCard/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageDetailsReducer } from '@/pages/ArticlePageDetails/testing';

const defaultAsyncReducers: ReducersList = {
    login: loginReducer,
    profile: profileReducers,
    articlesDetails: articleDetailsReducers,
    addCommentForm: addCommentFormReducers,
    articlePageDetails: articlePageDetailsReducer,
};
export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
        (
            <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
                <StoryComponent />
            </StoreProvider>
        );
