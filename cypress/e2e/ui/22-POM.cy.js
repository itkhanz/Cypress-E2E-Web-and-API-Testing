/***********************************************************
Page Object Model (POM)

https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/
https://www.browserstack.com/guide/cypress-page-object-model
https://www.lambdatest.com/learning-hub/cypress-page-object-model
https://www.toolsqa.com/cypress/page-object-pattern-in-cypress/
https://blog.knoldus.com/how-to-implement-the-page-object-model-using-cypress/


************************************************************/

//npx cypress run --spec cypress/e2e/22-POM.cy.js --browser chrome --headed

import Login from "../../pages/LoginPage";
import Home from "../../pages/HomePage";

describe("Page Object Model", () => { 

    xit('login', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get("input[name='username']").type('Admin');
        cy.get("input[name='password']").type('admin123');
        cy.get("button[type='submit']").click();
        cy.get("h6.oxd-text").should('have.text', 'Dashboard')
    })


    xit('login with POM', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        const loginPage = new Login();
        loginPage.setUserName('Admin')
        loginPage.setPassword('admin123')
        loginPage.clickSubmit()

        const homePage = new Home();
        homePage.verifyDashboard();
    })


    it('login with POM using fixtures', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        cy.fixture('orangehrm').then((data) => {


            /* const loginPage = new Login();
            loginPage.setUserName(data.username)
            loginPage.setPassword(data.password)
            loginPage.clickSubmit()
    
            const homePage = new Home();
            homePage.verifyDashboard(data.expected); */

            const homePage = new Login()
                .setUserName(data.username)
                .setPassword(data.password)
                .clickSubmit()
                .verifyDashboard(data.expected);

        })

       
    })

    

})
