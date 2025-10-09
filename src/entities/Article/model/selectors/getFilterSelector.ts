import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '../types/artcile';

export const getFilterSelectorSort = (state:StateSchema) => state.articlePage?.sort || ArticleSortField.VIEWS;
export const getFilterSelectorOrder = (state:StateSchema) => state.articlePage?.order || 'asc';
export const getFilterSelectorSearch = (state:StateSchema) => state.articlePage?.search || '';
