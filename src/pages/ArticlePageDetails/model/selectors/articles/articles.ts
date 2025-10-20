import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getAuthUserData } from '@/entities/User';

export const getCanEditArticles = createSelector(getArticleDetailsData, getAuthUserData, (article, user) => {
    if (!article || !user) {
        return false;
    }
    return article.user.id === user.id;
});
