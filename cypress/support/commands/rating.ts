
export const setRate = (rate:number) => {
    cy.getByTestId(`StarRating.${rate}`).click()
    cy.getByTestId("RatingCard.SendButton").click()
   };



declare global {
  namespace Cypress {
    interface Chainable {
      setRate(rate:number): Chainable<void>;
    }
  }
}
