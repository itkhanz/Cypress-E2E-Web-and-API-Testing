/* Read Also */
/****************************************************************************
https://www.freecodecamp.org/news/css-selectors-cheat-sheet/
https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Querying-Elements
https://filiphric.com/cypress-basics-selecting-elements
https://filiphric.com/cypress-basics-xpath-vs-css-selectors
https://filiphric.com/contains-an-overlooked-gem-in-cypress
https://docs.cypress.io/guides/core-concepts/cypress-app#Selector-Playground 
https://docs.cypress.io/api/table-of-contents#Queries
https://docs.cypress.io/api/commands/get
https://docs.cypress.io/api/commands/find
https://glebbahmutov.com/cypress-examples/commands/querying.html
https://glebbahmutov.com/cypress-examples/commands/traversal.html
****************************************************************************/


describe("CSSLocators", () => {

    it('verify search results', () => {
        cy.visit("https://naveenautomationlabs.com/opencart/")

        cy.get("[placeholder='Search']").type("MacBook")

        cy.get("#search button").click()

        // Assert the text for first search result
        cy.get(".product-layout:first-child h4:first-of-type a").contains("MacBook")
    
      })

})