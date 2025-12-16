describe('test routing', () => {
  it('visit MainPage', () => {
    cy.visit('/')
    cy.get('[data-testid="MainPage"]').should('exist')
  })
})