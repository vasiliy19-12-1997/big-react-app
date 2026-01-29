import { createSelector } from '@reduxjs/toolkit';
import { getAuthUserData } from '@/entities/User';
import { getRouteAbout, getRouteArticle, getRouteMain, getRouteProfile } from '@/shared/const/router';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/features';

export const getSidebarItems = createSelector(getAuthUserData, (userData) => {
    const SidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isNewDesignEnabled',
                on: () => MainIcon,
                off: () => MainIconDeprecated,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isNewDesignEnabled',
                on: () => AboutIcon,
                off: () => AboutIconDeprecated,
            }),
            text: 'О сайте',
        },
    ];
    if (userData) {
        SidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isNewDesignEnabled',
                    on: () => ProfileIcon,
                    off: () => ProfileIconDeprecated,
                }),
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticle(),
                Icon: toggleFeatures({
                    name: 'isNewDesignEnabled',
                    on: () => ArticleIcon,
                    off: () => ArticleIconDeprecated,
                }),
                text: 'Article',
                authOnly: true,
            },
        );
    }
    return SidebarItemsList;
});
