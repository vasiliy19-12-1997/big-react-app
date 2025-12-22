describe('Пользователь заходит на страницу статей', () => {
  beforeEach(() => {
    cy.login().then((data)=>{
      cy.visit(`articles/${data.id}`)
    })
  })
  //TODO написать тесты на фильтры, сортировку и т.д.
  it('Страницы подгрузились', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
})