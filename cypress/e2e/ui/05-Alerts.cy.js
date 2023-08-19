// ***********************************************************
// Cypress Interaction with Alerts
// It can handle alerts automatically
// https://docs.cypress.io/api/cypress-api/catalog-of-events#App-Events
// https://applitools.com/blog/testing-browser-alerts-confirmations-prompts-cypress/
// https://docs.cypress.io/api/commands/visit#Add-basic-auth-headers
// ***********************************************************

/// <reference types="Cypress" />

describe("Alerts", () => {

    it('automates Alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //Cypress will automatically accept the alert so you will not see it visually
        cy.get("button[onClick='jsAlert()']").click()

        //Listen to the event to assert for the alert text
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('I am a JS Alert')
        })

        //alert window gets automatically closed by cypress
        cy.get("#result").should('have.text', 'You successfully clicked an alert')

    });

    it('automates Confirm alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //Accept Alert
        cy.get("button[onClick='jsConfirm()']").click()        
        cy.on('window:confirm', (alert) => {
            expect(alert).to.contains('I am a JS Confirm')
        })
        cy.get("#result").should('have.text', 'You clicked: Ok')
    });

    it('automates Cancel alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //Cancel Alert
        cy.get("button[onClick='jsConfirm()']").click()
         //cypress closes alert window using Cancel button. Default is OK button
        cy.on('window:confirm', () => false)  

        cy.get("#result").should('have.text', 'You clicked: Cancel')
    });

    it('automates Prompt alert accept', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //cypress automatically closes the prompt with OK, we just need to pass text

        //Before opening the window, we capture the window, and stub it by specifying window type and text
        cy.window().then( (window) => {
            cy.stub(window, 'prompt').returns('hello cypress')
        })

        //Now we click on the button to trigger prompt window
        cy.get("button[onClick='jsPrompt()']").click()

        cy.get("#result").should('have.text', 'You entered: hello cypress')

    });

    it('automates Prompt alert cancel', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //cypress automatically closes the prompt with OK, we just need to pass text

        cy.window().then( (window) => {
            //cy.stub(window, 'prompt').returns(null)
            cy.stub(window, 'prompt').callsFake(() => null)
        })

        //Now we click on the button to trigger prompt window
        cy.get("button[onClick='jsPrompt()']").click()

         //if you wish to close the prompt with Cancel, you need to pass text as well as alert false event
         //cy.on('window:confirm', () => false)

        cy.get("#result").should('have.text', 'You entered: null')
    });

    it('automates Authenticated Alert', () => {
        //Approach 1
        /* cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin'
            }
        }); */

        //Approach 2
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })

        //automatioally performs assertion (no need to assert expplicitly, if element is not found then test fails)
        cy.get('.example p').contains('Congratulations');
    })
    
})
