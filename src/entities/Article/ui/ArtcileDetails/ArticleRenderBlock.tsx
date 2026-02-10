import { ArtcileTypeBlocks, ArticleBlockType } from '../../model/types/artcile';
import { ArtcileCodeBlockComponent } from '../ArtcileCodeBlockComponent/ArtcileCodeBlockComponent';
import { ArtcileImageBlockComponent } from '../ArtcileImageBlockComponent/ArtcileImageBlockComponent';
import { ArtcileTextBlockComponent } from '../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import cls from './ArtcileDetails.module.scss';

export const renderBlocks = (blocks: ArtcileTypeBlocks) => {
    switch (blocks.type) {
        case ArticleBlockType.TEXT:
            return <ArtcileTextBlockComponent key={blocks.id} className={cls.block} block={blocks} />;
        case ArticleBlockType.CODE:
            return <ArtcileCodeBlockComponent key={blocks.id} block={blocks} className={cls.block} />;
        case ArticleBlockType.IMAGE:
            return <ArtcileImageBlockComponent key={blocks.id} block={blocks} className={cls.block} />;
        default:
            return null;
    }
};
