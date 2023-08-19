/***********************************************************
Browser Navigation in Cypress
To go back or forward in the browser's history, use the cy.go() command.
To reload the page, use the cy.reload() command.

https://example.cypress.io/commands/navigation
https://docs.cypress.io/api/commands/go
https://docs.cypress.io/api/commands/reload
https://docs.cypress.io/api/commands/visit
https://glebbahmutov.com/cypress-examples/commands/navigation.html


************************************************************/


describe("Navigation", () => { 

    before(() => {

    })

    it.only('navigates browser page forward and backward', () => {
        
        cy.visit("https://demo.opencart.com/");

        cy.get('h3').contains('Featured');

        cy.get('a').contains('MacBook').click();

        cy.get('#tab-description').should('contain.text', '1GB memory, larger hard drives');

        cy.go('back'); //go back to home page
        cy.get('h3').contains('Featured');

        cy.go('forward'); //navigate forward to MacBook details page
        cy.get('#tab-description').should('contain.text', '1GB memory, larger hard drives');

        cy.go(-1); //navigate back
        cy.get('h3').contains('Featured');

        cy.go(1); //navigate forward
        cy.get('#tab-description').should('contain.text', '1GB memory, larger hard drives');

    })

    
})
