import { dataTestId } from '../helpers/dataTestid';

describe('test routing', () => {
    describe('Пользователь не авторизован', () => {
        it('visit MainPage', () => {
            cy.visit('/');
            cy.get(dataTestId('MainPage')).should('exist');
        });
        it('try to open ArticlePage', () => {
            cy.visit('/articles');
            cy.get(dataTestId('MainPage')).should('exist');
        });
        it('try to visit notFoundPage', () => {
            cy.visit('/fdfdfdfd');
            cy.get(dataTestId('NotFoundPage')).should('exist');
        });
    });
    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('visit ArticlePage', () => {
            cy.visit('/articles');
            cy.get(dataTestId('ArticlePage')).should('exist');
        });
        it('visit ProfilePage', () => {
            cy.visit('/profile/1');
            cy.get(dataTestId('ProfilePage')).should('exist');
        });
    });
});
