// ***********************************************************
// Working with iframes in Cypress
// 
// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
// https://www.lambdatest.com/blog/how-to-handle-iframes-in-cypress/
// https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-test-elements-inside-an-iframe
// https://github.com/cypress-io/cypress/issues/136
// https://www.npmjs.com/package/cypress-iframe

// ***********************************************************

/// <reference types="Cypress" />
import 'cypress-iframe';


describe("How To Handle iFrames In Cypress", () => { 

    it('automates iFrame', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');

        //Gets the iframe with ID
        //Gets the html document within the iframe tag and return it 
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        const iFrame = cy.get('#mce_0_ifr')
                        .its('0.contentDocument.body')
                        .should('be.visible')
                        .then(cy.wrap);

        //Enters the Welcome text and then press keyboard keys to select the text
        iFrame.clear().type("Welcome {ctrl+a}");

        //Bold button click
        cy.get("[aria-label='Bold']").click();

    });

    it('automates iFrame with custom command', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');


        //we can also create our custom aommand to reuse this method to be able to use for all the iframes
        //we defined or custome command in support/commands.js
        //IT will perform all the steps of getting and wrapping the iframe element behind the scenes
        cy.getIFrame('#mce_0_ifr').clear().type("Welcome {ctrl+a}");

        //Bold button click
        cy.get("[aria-label='Bold']").click();

    });


    it('automates iFrame with cypress-iframe-plugin', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');


        //Install the cypress plugin with npm install -D cypress-iframe
        //Add import 'cypress-iframe'; to the top of file or in cypress/support/commands.js

        cy.frameLoaded('#mce_0_ifr');   //loads the frame

        cy.iframe('#mce_0_ifr').clear().type("Welcome {ctrl+a}");

        //Bold button click
        cy.get("[aria-label='Bold']").click();

    });

    
})
