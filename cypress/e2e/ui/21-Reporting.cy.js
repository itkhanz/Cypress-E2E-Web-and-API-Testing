/***********************************************************
Screenshot and Videos in Cypress
Because Cypress is built on top of Mocha, that means any reporter built for Mocha can be used with Cypress. 

https://docs.cypress.io/guides/tooling/reporters
https://glebbahmutov.com/blog/the-awesome-battle/
https://automationqahub.com/how-to-generate-html-report-in-cypress-framework/
https://qaautomationlabs.com/how-to-integration-of-allure-report-with-cypress/

************ cypress-mochawesome-reporter ************
https://www.npmjs.com/package/cypress-mochawesome-reporter
https://github.com/LironEr/cypress-mochawesome-reporter
https://www.browserstack.com/guide/cypress-html-reporter
*******************************************************

******************** mochawesome **********************
https://www.npmjs.com/package/mochawesome
https://github.com/adamgruber/mochawesome
https://glebbahmutov.com/blog/cypress-mochawesome/
*******************************************************

******************** Allure *********************
https://www.npmjs.com/package/@shelex/cypress-allure-plugin
https://qaautomationlabs.com/how-to-integration-of-allure-report-with-cypress/
**************************************************

************************************************************/

//Run the below command to run test cases in chrome browser headed mode for this spec file
//npx cypress run --spec cypress/e2e/21-Reporting.cy.js --browser chrome --headed
//Reports will be generated under reports/html folder

describe("Test Suite for OrangeHRM", () => { 

    it('Positive TC - validates the title of website', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.title().should('eq', 'OrangeHRM');
    })


    it('Negative TC - validates the title of website', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.title().should('eq', 'Wrong Page Title');
    })


    it('Successfully Login to website to validate dashboard', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();

        //This name can get changed so better not to use this as validation removing flakiness
        cy.get("h6.oxd-text").should('have.text', 'Dashboard')
    })

    
    it('Failed Login to validate error message', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('peter');
        cy.get("input[name='password']").type('pan');
        cy.get("button[type='submit']").click();

        cy.get("h6.oxd-text").should('not.exist');
        cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
    })
})
