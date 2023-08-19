// ***********************************************************
// Mouse Actions in Cypress
// 
// https://docs.cypress.io/guides/core-concepts/interacting-with-elements
// https://docs.cypress.io/api/commands/rightclick
// https://docs.cypress.io/api/commands/scrollIntoView
// https://docs.cypress.io/api/commands/scrollTo
// https://docs.cypress.io/api/commands/hover
// https://docs.cypress.io/api/commands/trigger
// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/testing-dom__drag-drop
// https://www.npmjs.com/package/@4tw/cypress-drag-drop
// https://glebbahmutov.com/cypress-examples/commands/actions.html
// https://www.browserstack.com/guide/cypress-touch-and-mouse-events
//https://stackoverflow.com/questions/58713418/verify-element-is-within-viewport-with-cypress
// https://github.com/cypress-io/cypress/issues/877
// 

// ***********************************************************

/// <reference types="Cypress" />
import 'cypress-iframe';
import '@4tw/cypress-drag-drop';


describe("Handling Tables", () => { 

    it('Mouse Over', () => {
        cy.visit('https://demo.opencart.com/');

        cy.get("#narbar-menu a").contains("PC").should("not.be.visible");

        cy.get("#narbar-menu a").contains("Desktops").parent().trigger('mouseover').click();

        cy.get("#narbar-menu a").contains("PC").should("be.visible");

    });

    
    it('Right Click', () => {
        
        cy.visit("https://the-internet.herokuapp.com/context_menu");

        
        //First approach: using  rightclick
        //cy.get("#hot-spot").rightclick();

        //Second approach: using trigger 
        cy.get("#hot-spot").trigger('contextmenu')

        //Listen to the event to assert for the alert text
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('You selected a context menu')
        })

        //alert window gets automatically closed by cypress so it is not visible
        
    });
    
    
    it('Double Click', () => {
        cy.visit('https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick');

        cy.get('#accept-choices').click();

        //cy.getIFrame('#iframeResult');
        cy.frameLoaded('#iframeResult');   //loads the frame using plugin

        cy.iframe("#iframeResult").find("#demo").should('not.have.text', 'Hello World ')

        cy.iframe("#iframeResult").find("p").dblclick();

        cy.iframe("#iframeResult").find("#demo").should('have.text', 'Hello World ')
        
    });
    
    
    it('Drag and Drop using Plugin', () => {
        
        cy.visit('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');

        //using drag and drop plugin we identify the source and target element
        //Drag rome to italy
        cy.get('#box6').drag('#box106');

        //If the element is hiddem, you can perform action forcefully
        //cy.get('#box6').drag('#box106', {force:true});

    });
    
    
    it('Scrolling Page', () => {

        cy.visit('https://the-internet.herokuapp.com/');

        //scrolls fast
        //cy.get('#content li>a').contains('Shadow DOM').scrollIntoView();

        //Cypress's visible matcher treats an element as visible based on a variety of factors, 
        //however it doesn't take the viewport into account, 
        //so an element that is scrolled off-screen is still treated as visible.
        cy.get('#content li>a').contains('Shadow DOM').isNotInViewport();

        //scrolls in specified duration
        cy.get('#content li>a').contains('Shadow DOM').scrollIntoView({duration:2000});

        cy.get('#content li>a').contains('Shadow DOM').isInViewport();

        cy.get('#content li>a').contains('A/B Testing').scrollIntoView({duration:2000});

        cy.get('#content li>a').contains('Shadow DOM').isNotInViewport();
        
    });
        

    
})
