let profileId = '';
describe('Пользователь зашел на страницу конкретного профиля', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Проверяет заполненоость firstName', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });
    it('Редактирование профиля', () => {
        const newName = 'firstName';
        const newLastName = 'lastName';
        cy.updateProfile(newName, newLastName);
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastName);
    });
});
