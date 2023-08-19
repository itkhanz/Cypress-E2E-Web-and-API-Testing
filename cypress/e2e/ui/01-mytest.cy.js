/* Read Also */
/****************************************************************************
https://docs.cypress.io/guides/getting-started/installing-cypress
https://docs.cypress.io/guides/getting-started/opening-the-app
https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
https://docs.cypress.io/guides/end-to-end-testing/testing-your-app
https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets
****************************************************************************/



describe('My First Test Suite', () => {

  it('verify title positive', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.title().should('eq', 'OrangeHRM')

  })

  it('verify title negative', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.title().should('eq', 'OrangeHRM123')
  })

})