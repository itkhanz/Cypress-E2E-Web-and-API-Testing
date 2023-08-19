/***********************************************************
Fixtures in Cypress
Load a fixed set of data located in a file.
Cypress will automatically recognize the files in fixture folder

https://docs.cypress.io/api/commands/fixture
https://glebbahmutov.com/cypress-examples/commands/files.html#cy-fixture

************************************************************/


describe("Fixtures - load JSON data", () => { 
    let username;
    let password;
    let expectedText;

    before(() => {
        //If the test data is to be used in multiple tests, then recommended is to load the fixture in hook
        cy.fixture('orangehrm').then((data) => {
            username = data.username;
            password = data.password;
            expectedText = data.expected;
        })
    })


    it('login', () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.fixture('orangehrm').then((data) => {

            cy.get("input[name='username']").type(data.username);
            cy.get("input[name='password']").type(data.password);
            cy.get("button[type='submit']").click();
    
            cy.get("h6.oxd-text").contains(data.expected);
        })

    });


    it.only('login - load fixture in hook', () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.get("input[name='username']").type(username);
        cy.get("input[name='password']").type(password);
        cy.get("button[type='submit']").click();

        cy.get("h6.oxd-text").contains(expectedText);

    })


        

    
})
