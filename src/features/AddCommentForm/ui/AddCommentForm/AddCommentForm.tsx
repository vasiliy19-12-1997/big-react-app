import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions, addCommentFormReducers } from 'features/AddCommentForm/model/slice/AddCommentFormSlice';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from 'features/AddCommentForm/model/selectors/addCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
    }, [onCommentChange, onSendComments, text]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input className={cls.input} value={text} onChange={onCommentChange} placeholder={t('Введите текст комментария')} />
                <Button onClick={onSendHandler}>{t('Отправить')}</Button>
            </div>
        </DynamicModuleLoader>
    );
});
export default AddCommentForm;
