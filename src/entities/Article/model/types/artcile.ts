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
export enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}
export enum ArticleViews{
    BIG = 'BIG',
    SMALL = 'SMALL'
}
export type ArtcileTypeBlocks = ArtcileBlockImage | ArtcileBlockText | ArtcileBlockCode
export interface Article {
        id: string;
        title: string;
        subtitle: string;
        img: string;
        views: number;
        createdAt: string;
        type: ArticleType[];
        blocks:ArtcileTypeBlocks[]
}
