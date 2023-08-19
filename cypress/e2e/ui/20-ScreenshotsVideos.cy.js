/***********************************************************
Screenshot and Videos in Cypress
Take a screenshot of the application under test.
Cypress automatically takes screenshot on test failure and save under screenshots folder, videos will be saved under video folder
Only possible when tests are running via cmd or CI

https://docs.cypress.io/guides/guides/screenshots-and-videos
https://docs.cypress.io/api/cypress-api/screenshot-api
https://docs.cypress.io/api/commands/screenshot
https://glebbahmutov.com/cypress-examples/commands/misc.html#cy-screenshot

************************************************************/


describe("Screenshot capture and Video recording", () => { 

    before(() => {

    })

    it.skip('captures screenshot', () => {
        
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        //save screenhot with random name
        cy.screenshot();

        //saves the screenshot with name
        cy.screenshot("hompage")

        //capture screenshot of specific element
        cy.get("img[alt='company-branding']").screenshot();
        
    })

    it('capture screeenshot and record video on failure', () => {

        cy.visit('https://demo.opencart.com/');

        
        //npx cypress run --spec cypress/e2e/20-ScreenshotsVideos.cy.js
        //By default it will run tests in headless mode

        cy.title().should('eq', 'incorrect page title');
    })

    
})
