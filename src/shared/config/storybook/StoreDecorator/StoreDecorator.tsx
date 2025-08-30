import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducers } from 'entities/Article/model/slice/artcileDetailsSlice';
import { addCommentFormReducers } from 'features/AddCommentForm/model/slice/AddCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducers } from 'features/EditableProfileCard';
import { articleDetailsReducer } from 'pages/ArticlePageDetails/model/selectors';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

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
