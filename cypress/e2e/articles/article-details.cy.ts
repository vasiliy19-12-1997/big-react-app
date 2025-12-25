let currentArticleId = '1';
describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
      cy.login();
      cy.createArticle().then((article)=>{
        cy.log(JSON.stringify(article.id))
        currentArticleId =  article.id
        cy.visit(`articles/${article.id}`)
      })
   })
  // Создали статью протестили что нужно и удалили полотом
    afterEach(()=>{
      if(currentArticleId){
        cy.removeArticle(currentArticleId)
      }
    })
  it('Видно содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })
  it('Видно блок с комментариями и получилось оставить комментарий', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment("test")
    cy.getByTestId('CommentaryCard.Content')
      .should('exist')
      .contains('test')
    
  })
})