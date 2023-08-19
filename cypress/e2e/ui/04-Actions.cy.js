// ***********************************************************
// Cypress Interaction with Elements
// https://docs.cypress.io/guides/core-concepts/interacting-with-elements
// https://docs.cypress.io/api/table-of-contents#Actions
// https://glebbahmutov.com/cypress-examples/commands/actions.html
// https://filiphric.com/cypress-basics-check-attributes-value-and-text
// https://docs.cypress.io/api/commands/each
// https://glebbahmutov.com/cypress-examples/recipes/each-example.html
// ***********************************************************

/// <reference types="Cypress" />

describe("Actions / Interacting with Elements", () => {

    /* beforeEach(() => {
        cy.visit('https://itera-qa.azurewebsites.net/home/automation')
    }); */
    
    
    it('interacts with Radio Buttons', () => {

        cy.visit('https://itera-qa.azurewebsites.net/home/automation')

        cy.get('input#male').should('be.visible')
        cy.get('input#female').should('be.visible')

        cy.get('input#male').check().should('be.checked')
        cy.get('input#female').should('not.be.checked')

        cy.get('input#female').check().should('be.checked')
        cy.get('input#male').should('not.be.checked')
    });

    it('interacts with Checkboxes', () => {

        cy.visit('https://itera-qa.azurewebsites.net/home/automation')
        
        cy.get('input#monday').should('be.visible')

        cy.get('input#monday').check().should('be.checked')

        cy.get('input#monday').uncheck().should('not.be.checked')

        //selects/unselects all the checkboxes
        cy.get(".form-check-input[type='checkbox']").check().should('be.checked')
        cy.get(".form-check-input[type='checkbox']").uncheck().should('not.be.checked')

        //selects the first and last checkbox
        cy.get(".form-check-input[type='checkbox']").first().check().should('be.checked')
        cy.get(".form-check-input[type='checkbox']").last().check().should('be.checked')
    });

    it('interacts with Dropdowns', () => {

        cy.visit('https://www.zoho.com/commerce/free-demo.html')

        cy.get('#zcf_address_country').select('Italy').should('have.value', 'Italy')
    });

    it('interacts with Bootstrap Dropdowns which does not have select tag', () => {

        cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/')
        
        cy.get('#select2-billing_country-container').click()

        //Typing in the input field will autosuggest dropdown values dynamically
        cy.get('.select2-search__field').type('Italy').type('{enter}')

        //since there is no select tag so we use have.text instead of have.value
        cy.get('#select2-billing_country-container').should('have.text', 'Italy')

    });

    it('interacts with auto-suggestive Dropdown', () => {

        cy.visit('https://www.wikipedia.com/')
        
        cy.get('#searchInput').click()

        //Typing in the input field will autosuggest dropdown values dynamically
        cy.get('#searchInput').type('Germany')

        //Clicking on the auto-suggested dropdown values will open new page
        cy.get("#typeahead-suggestions .suggestion-highlight").first().contains('Germany').click()

        //since there is no select tag so we use have.text instead of have.value
        cy.get('#firstHeading').should('have.text', 'Germany')

    });

    it('interacts with dynamic Dropdown', () => {

        //website opens in German if you access from Germany so the locators change
        cy.visit('https://www.google.com/')

        cy.get('button div').contains("Alle akzeptieren").click();
        
        cy.get("[title=Suche]").click().type("cypress website")

        //wait for 3 seconds for suggestions to load
        cy.wait(3000)

        //validate total number of suggestions
        //cy.get("div[role='presentation'] div[role='option']").should('have.length', '10')

        //log the attribute of first suggestion
        cy.get("div[role='presentation'] div[role='option']").first()
        .invoke('attr', 'aria-label').then((attr) => {
            cy.log(attr)
            expect(attr).to.eq('cypress website')
        })

        //loop through the list and perform action on dropdown item
        cy.get("div[role='presentation'] div[role='option']").each(($el, index, $list) => {
            if ($el.text() == 'cypress website') {
                cy.wrap($el).click()
            }
        })

        //validate the search result with title exists
        cy.get('#search h3').contains('Cypress: JavaScript Component Testing and E2E Testing ...')
        .should('be.visible')

        //validate the first search result url is cypress official website
        cy.get('#search a').first().invoke('attr', 'href').should('eq', 'https://www.cypress.io/')
    });
})
