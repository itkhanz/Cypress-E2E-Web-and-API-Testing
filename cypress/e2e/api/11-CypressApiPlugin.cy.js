/***********************************************************
Cypress plugin API

Cypress plugin for effective API testing. Imagine Postman, but in Cypress. Prints out information about the API call in the Cypress App UI.

https://github.com/filiphric/cypress-plugin-api
https://www.npmjs.com/package/cypress-plugin-api
https://www.youtube.com/watch?v=Bor_OqOjEuQ
https://qaautomationlabs.com/cypress-api-automation-using-plugin-cypress-plugin-api/

You can now use cy.api() command. This command works exactly like cy.request() but in addition to calling your API, it will print our information about the API call in your Cypress runner.

************************************************************/



describe("Cypress API Plugin Demonstration", () => { 

    it("GET API testing Using Cypress API Plugin", () => {
        cy.api("GET", "https://reqres.in/api/users?page=2").should((response) => {
          expect(response.status).to.eq(200);
        });
    });

    it("POST API testing Using Cypress API Plugin", () => {
        cy.api("POST", "https://reqres.in/api/users", {
            name: "morpheus",
            job: "leader",
        }).should((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it("PUT API testing Using Cypress API Plugin", () => {
        cy.api("PUT", "https://reqres.in/api/users/2", {
          name: "morpheus",
          job: "zion resident",
        }).should((response) => {
          expect(response.status).to.eq(200);
        });
    });
    

    it("DELETE API testing Using Cypress API Plugin", () => {
        cy.api("DELETE", "https://reqres.in/api/users/2").should((response) => {
          expect(response.status).to.eq(204);
        });
    });
})

