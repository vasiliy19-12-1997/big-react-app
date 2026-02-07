import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeatures } from '@/shared/features';
import { Article, ArticleView } from '../../model/types/artcile';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesign } from './ArticleListItemRedesign/ArticleListItemRedesign';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={<ArticleListItemRedesign {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
});
