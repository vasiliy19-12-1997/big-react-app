let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article)=>{
      currentArticleId =  article.id
      cy.log(JSON.stringify(article))
      cy.visit(`articles/${article.id}`)
    })
   })
  // Создали статью протестили что нужно и удалили полотом
    afterEach(()=>{
      cy.removeArticle(currentArticleId)
    })
  it('Видно содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')

  })
})