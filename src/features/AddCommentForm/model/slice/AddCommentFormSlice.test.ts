import { AddCommentFormTypes } from '../types/AddCommentFormTypes';
import { addCommentFormActions, addCommentFormReducers } from './AddCommentFormSlice';

describe('AddCommentFormSlice.test', () => {
    test('set text', () => {
        const state: DeepPartial<AddCommentFormTypes> = { text: 'Vasya' };
        expect(addCommentFormReducers(state as AddCommentFormTypes, addCommentFormActions.setText('123123'))).toEqual({
            text: '123123',
        });
    });
    test('set empty text', () => {
        const state: DeepPartial<AddCommentFormTypes> = { text: '' };
        expect(addCommentFormReducers(state as AddCommentFormTypes, addCommentFormActions.setText(''))).toEqual({
            text: '',
        });
    });
});
