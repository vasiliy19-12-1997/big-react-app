import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { $api } from 'shared/config/api/api';
import { profileReducers } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Irish,
    city: 'Moscow',
    username: 'admin',
};
const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducers,
    },
};

describe('feautures/EditableProfileCard.test', () => {
    test('Режим readOnly должен переключиться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));
        expect(screen.getByTestId('EditableProfileCardHeader.Cancel')).toBeInTheDocument();
    });
    test('При отмене должны обнуляться значения до initial state', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firsname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firsname'), 'azalia');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'faizullina');

        expect(screen.getByTestId('ProfileCard.firsname')).toHaveValue('azalia');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('faizullina');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Cancel'));

        expect(screen.getByTestId('ProfileCard.firsname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });
    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firsname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Save'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });
    test('Должен отправить put запрос, что форма успешная', async () => {
        const mockPutRequest = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));
        await userEvent.type(screen.getByTestId('ProfileCard.firsname'), 'azalia');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'faizullina');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Save'));

        expect(mockPutRequest).toHaveBeenCalled();
    });
});
