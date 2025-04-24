import { ClassNames } from './ClassNames';

describe('classNames', () => {
    const expected2 = 'className dev1 dev2';
    const expected3 = 'className dev1 dev2 hovered';
    const expected4 = 'className dev1 dev2';

    test('with 1  param', () => {
        expect(ClassNames('className', {}, [])).toBe('className');
    });
    test('with 2 params', () => {
        expect(ClassNames('className', {}, ['dev1', 'dev2'])).toBe(expected2);
    });
    test('with 3 params', () => {
        expect(ClassNames('className', { hovered: true }, ['dev1', 'dev2']))
            .toBe(expected3);
    });
    test('with undefined', () => {
        expect(ClassNames(
            'className',
            { hovered: undefined },
            ['dev1', 'dev2'],
        ))
            .toBe(expected4);
    });
    test('with null', () => {
        expect(ClassNames('className', { hovered: null }, ['dev1', 'dev2']))
            .toBe(expected4);
    });
});
