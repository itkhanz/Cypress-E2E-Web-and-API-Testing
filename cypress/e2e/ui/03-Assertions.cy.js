/* Read Also */
/****************************************************************************
Cypress bundles Chai, Chai-jQuery, and Sinon-Chai to provide built-in assertions. 

https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Asserting-About-Elements
https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions
https://docs.cypress.io/guides/references/assertions
https://docs.cypress.io/api/table-of-contents#Assertions
https://glebbahmutov.com/cypress-examples/commands/assertions.html
https://medium.com/@anshita.bhasin/most-commonly-used-assertions-in-cypress-8e5b28f1b45a
https://www.lambdatest.com/learning-hub/cypress-assertions
****************************************************************************/



describe("Cypress Assertions", () => {

    it('performs implicit assertions', () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/")

        cy.url().should('include', 'orangehrmlive.com')
        .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        .and('contain', 'orangehrm')
        .and('not.contain', 'greennhrm')

        cy.title().should('include', 'Orange')
        .and('eq', 'OrangeHRM')
        .and('contain', 'HRM')

        cy.get('.orangehrm-login-branding > img').should('be.visible')
        .and('exist')

        cy.get("a").should('have.length', '5')

        cy.get("input[placeholder='Username']")
        .type("Admin")
        .should('have.value', "Admin")
        
    
    })

    it('performs explicit assertions', () => {

      cy.visit("https://opensource-demo.orangehrmlive.com/")

      cy.get("input[placeholder='Username']").type("Admin")
      cy.get("input[placeholder='Password']").type("admin123")
      cy.get("button[type='submit']").click()

      const expectedName = "Paulusha Collingskogile"
      cy.get('.oxd-userdropdown-name').then((x) => {
        let actualName = x.text()

        //BDD Style
        expect(actualName).to.eq(expectedName)

        //TDD Style
        assert.equal(actualName, expectedName)
      });

    });

     
})