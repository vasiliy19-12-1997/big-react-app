import { getByTestId } from "../../support/commands/common"

describe('Пользователь зашел на страницу конкретного профиля', () => {
  beforeEach(()=>{
    cy.login().then((data)=>{
    cy.visit(`profile/${data.id}`)
  })
  })
  it('Проверяет заполненоость firstName', () => {
    getByTestId("ProfileCard.firstname").should('have.value','test')
  })
  it('passes', () => {
  })
})