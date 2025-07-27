export enum ArticleBlockType {
    CODE = 'CODE',
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
}
interface ArticleBlockBase {
    id:string;
    type:ArticleBlockType
}
export interface ArtcileBlockImage extends ArticleBlockBase {
    type:ArticleBlockType.IMAGE;
    src:string;
    title?:string;
}
export interface ArtcileBlockText extends ArticleBlockBase {
    type:ArticleBlockType.TEXT;
    paragraphs:string[];
    title:string
}
export interface ArtcileBlockCode extends ArticleBlockBase {
    type:ArticleBlockType.CODE;
    code:string
}
enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}

export type ArtcileTypeBlocks = ArtcileBlockImage | ArtcileBlockText | ArtcileBlockCode
export interface Article {
        id: number;
        title: string;
        subtitle: string;
        img: string;
        views: number;
        createdAt: number;
        type: ArticleType[];
        blocks:ArtcileTypeBlocks[]
}
