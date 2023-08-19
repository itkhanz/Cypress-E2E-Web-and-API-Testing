/***********************************************************
Custom Commands in Cypress
Cypress comes with its own API for creating custom commands and overwriting existing commands. 
Intellisense for custom command can  be added by adding its deinition in support/index.d.ts

https://docs.cypress.io/api/cypress-api/custom-commands
https://docs.cypress.io/api/cypress-api/custom-queries
https://learn.cypress.io/advanced-cypress-concepts/building-the-right-cypress-commands
https://toolsqa.com/cypress/custom-commands-in-cypress/
https://github.com/cypress-io/cypress/issues/2293
https://docs.cypress.io/guides/tooling/IDE-integration
https://glebbahmutov.com/cypress-examples/cypress-api/#cypress-commands-add
https://stackoverflow.com/questions/75670135/getting-an-error-using-cypress-commands-overwritequery

************************************************************/


describe("Custom Commands", () => { 


    it('adds new custom command', () => {
        
        cy.visit("https://demo.nopcommerce.com/");

        //manual way
        //cy.get('.product-title a').contains('Apple MacBook Pro 13-inch').click();
        
        //perform click action on product by passing its text with custom command clickLinkByText()
        //In selenium, we have byLinkText locator
        cy.clickLinkByText('Apple MacBook Pro 13-inch');

        cy.get('.product-name h1').should('have.text', 'Apple MacBook Pro 13-inch');

    });    

    
    it('overwrites existing query', () => {
        
        cy.visit("https://demo.nopcommerce.com/");

        //default contains() method is case-sensitive so we write custom command to overwrite it and make case-insensitive
        //https://docs.cypress.io/api/commands/contains#Case-Sensitivity
        cy.get('.product-title a').contains('Apple MacBook Pro 13-inch'.toUpperCase()).click();

        cy.get('.product-name h1').should('have.text', 'Apple MacBook Pro 13-inch');

    });  


    it.only('adds custom login command', () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.loginToOrangeHRM('Admin', 'admin123');

        cy.get("h6.oxd-text").contains('Dashboard');

    });  

    
})
