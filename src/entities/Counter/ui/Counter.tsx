import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { add, decrement, increment } = useCounterActions();
    const handleIncrement = () => {
        increment();
    };
    const handleDecrement = () => {
        decrement();
    };
    const handleAdd = () => {
        add(5);
    };
    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={handleIncrement}>{t('increment')}</Button>
            <Button data-testid="decrement-btn" onClick={handleDecrement}>{t('decrement')}</Button>
            <Button data-testid="add-btn" onClick={handleAdd}>{t('add')}</Button>
        </div>
    );
};
