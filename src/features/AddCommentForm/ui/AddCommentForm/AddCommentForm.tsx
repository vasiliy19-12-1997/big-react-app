import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { getAddCommentFormText } from '../../model/selectors/addCommentForm';
import { addCommentFormActions, addCommentFormReducers } from '../../model/slice/AddCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComments:(text:string)=>void;
}
const reducers:ReducersList = {
    addCommentForm: addCommentFormReducers,
};
const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { t } = useTranslation();
    const { className, onSendComments } = props;
    const text = useSelector(getAddCommentFormText);
    const dispatch = useAppDispatch();
    const onCommentChange = useCallback((value:string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComments(text || '');
        onCommentChange('');
        console.log('Работает отправка');
    }, [onCommentChange, onSendComments, text]);

    return (
        // <>
        <DynamicModuleLoader reducers={reducers}>
            <HStack max className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input className={cls.input} value={text} onChange={onCommentChange} placeholder={t('Введите текст комментария')} />
                <Button onClick={onSendHandler}>{t('Отправить')}</Button>
            </HStack>
        </DynamicModuleLoader>
        // </>
    );
});
export default AddCommentForm;
