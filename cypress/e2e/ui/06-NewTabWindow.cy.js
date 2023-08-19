// ***********************************************************
// Cypress Interaction with New Tabs and Windows
// It cannot go to the new tab but we can handle it indirectly by removing the target=_blank attribute
// https://docs.cypress.io/api/commands/invoke
// https://glebbahmutov.com/cypress-examples/commands/connectors.html#invoke
// https://docs.cypress.io/api/commands/go
// https://glebbahmutov.com/cypress-examples/commands/navigation.html
// 

// ***********************************************************

/// <reference types="Cypress" />

describe("Handling New Tab and Window navigation", () => { 

    it('opens new tab link in same tab by removing target attribute', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');

        //remove the target=_blank attribute and then click so new tab opens on same page
        cy.get(".example > a").invoke('removeAttr', 'target').click()

        cy.url().should('eq', 'https://the-internet.herokuapp.com/windows/new')
        cy.get('h3').contains('New Window')
        cy.get('h3').should('not.have.text', 'Opening a new window')

        //wait for 3s and navigate back
        cy.wait(3000)
        cy.go('back')

        cy.url().should('eq', 'https://the-internet.herokuapp.com/windows')
        cy.get('h3').should('have.text', 'Opening a new window')

    });

    it('opens new tab link in same tab by visiting the href attribute', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');

        //gets the href attribute of link and visit the link in same tab
        //This will only work if the domain name is same in both the current page and target page
        cy.get(".example > a").then((el) => {
            let url = el.prop('href')
            cy.visit(url)
        })

        cy.url().should('eq', 'https://the-internet.herokuapp.com/windows/new')
        cy.get('h3').contains('New Window')
        cy.get('h3').should('not.have.text', 'Opening a new window')

        //wait for 3s and navigate back
        cy.wait(3000)
        cy.go('back')

        cy.url().should('eq', 'https://the-internet.herokuapp.com/windows')
        cy.get('h3').should('have.text', 'Opening a new window')

    });

    
})
