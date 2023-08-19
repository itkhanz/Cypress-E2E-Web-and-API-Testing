/***********************************************************
Data Driven Testing in Cypress
Load a fixed set of data located in a file.
Cypress will automatically recognize the files in fixture folder
we use forEach() on the object returned from fixture to rrun  the test three times

https://docs.cypress.io/api/commands/fixture
https://emelkan.hashnode.dev/data-driven-testing-with-cypress

************************************************************/


describe("Data Driven Tests", () => { 


    it('login - multiple times in data driven way', () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.fixture('orangehrm2').then((users) => {

            users.forEach((user) => {

                cy.get("input[name='username']").type(user.username);
                cy.get("input[name='password']").type(user.password);
                cy.get("button[type='submit']").click();
        
                if(user.username == 'Admin' && user.password == 'admin123') {
                    //Successful login
                    cy.get("h6.oxd-text").contains(user.expected);

                    //logout
                    cy.get('.oxd-userdropdown-tab').click();
                    cy.get(".oxd-userdropdown-link").contains('Logout').click();

                } else {
                    //Failed login
                    cy.get("div.oxd-alert-content--error p").contains(user.expected);
                }
                
            });

        })

    });        

    
})
