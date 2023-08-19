/***********************************************************
Hooks and Tags in Cypress
Cypress also provides hooks (borrowed from Mocha).

https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks

************************************************************/


describe("Hooks and Tags", () => { 

    before(() => {
        cy.log("***************** Launch App ********************");
    })

    after(() => {
        cy.log("***************** Close App ********************");
    })

    beforeEach(() => {
        cy.log("***************** Login ********************");
    });
    
    afterEach(() => {

        cy.log("***************** Logout ********************");

    })


    it('search', () => {
        
        //This test will not be executed because listing products has only() tag
        cy.log("***************** search ********************");

    });


    it.skip('advanced search', () => {

        //This test will be skipped
        cy.log("***************** advanced search ********************");

    });


    it.only('listing products', () => {

        //Only this test will be executed
        cy.log("***************** listing products ********************");

    });
        

    
})
