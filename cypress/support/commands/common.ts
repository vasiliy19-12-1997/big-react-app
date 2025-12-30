import { User } from '../../../src/entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { dataTestId } from '../../e2e/helpers/dataTestid';

export const login = (username: string = 'testuser', password: string = '123') => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8001/login',
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
            return body;
        });
};

export const getByTestId = (testId: string) => {
    return cy.get(dataTestId(testId));
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): ReturnType<typeof cy.get>;
        }
    }
}
