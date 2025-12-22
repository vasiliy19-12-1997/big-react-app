
export const updateProfile = ((firstName:string, lastName?:string) => {
    cy.getByTestId("EditableProfileCardHeader.Edit").click();
    cy.getByTestId("ProfileCard.firstname").clear().type(firstName || "updatedFirstName");
    cy.getByTestId("ProfileCard.lastname").clear().type(lastName || "updatedLastName");
    cy.getByTestId("EditableProfileCardHeader.Save").click();
});

export const resetProfile = (profileId: string) => {
    return cy.request({
    method: 'PUT',
    url: `http://localhost:8001/profile/${profileId}`,
    headers: {
      Authorization: 'Bearer'
    },
    body: {
      "id": "4",
      "first": "test",
      "lastname": "testLastName",
      "age": 1022322,
      "currency": "RUB",
      "country": "Russia",
      "city": "Moscow",
      "username": "testuser",
      "avatar": "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg"
    },
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName?: string, lastName?: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
