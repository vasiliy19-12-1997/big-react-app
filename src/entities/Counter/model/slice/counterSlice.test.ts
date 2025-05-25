import { CounterSchema } from '../types/CounterSchema';
import { counterActions, counterReducers } from './counterSlice';

describe('counterSlice.test', () => {
    test('increment', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducers(state as CounterSchema, counterActions.increment())).toEqual({ value: 11 });
    });
    test('increment', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducers(state as CounterSchema, counterActions.decrement())).toEqual({ value: 9 });
    });
    test('undefined', () => {
        expect(counterReducers(undefined, counterActions.increment())).toEqual({ value: 1 });
    });
});
