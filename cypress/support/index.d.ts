/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {

        /**
         * Click on the anchor tag link using text
         * @param text
         * @example 
         * Without custom command: cy.get('.product-title a').contains('Apple MacBook Pro 13-inch').click();
         * With Custom command: cy.clickLinkByText('Apple MacBook Pro 13-inch')
         */
        clickLinkByText(text: string): Chainable<any>;
    }
}