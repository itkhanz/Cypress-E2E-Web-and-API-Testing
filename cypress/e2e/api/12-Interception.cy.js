/***********************************************************
Intercepting Network Requests

Spy and stub network requests and responses.

https://docs.cypress.io/api/commands/intercept
https://docs.cypress.io/api/commands/wait
https://docs.cypress.io/api/commands/as
https://docs.cypress.io/guides/core-concepts/variables-and-aliases
https://docs.cypress.io/guides/guides/network-requests#Waiting
https://learn.cypress.io/advanced-cypress-concepts/intercepting-network-requests

[Understanding the Difference between cy.request() and cy.intercept()](https://www.youtube.com/watch?v=mwYD9H8wjTc)
[Cy.intercept | Spy API Calls | Mock API Calls | Stub API Calls | Example](https://www.youtube.com/watch?v=e_eSi3SJJUU)
************************************************************/

describe("Intercepting Network Requests", () => { 

    xit("should intercept the api response", () => {

        cy.visit('https://dummyapi.io/explorer');
        
       //cy.intercept(routeMatcher)
       //routeMatcher is an object used to match the incoming HTTP requests with this intercepted route
       //All properties are optional but all those that are set must match for the request to be intercepted. 
        cy.intercept({
            //HTTP request path after the hostname, including query parameters
            path: '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10'
        }).as('comments')

        cy.get('div').contains('Comments List').click();
    
        //wait for an aliased resource to resolve before moving on to the next command.
        cy.wait('@comments').then(interception => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.body.limit).eq(10)
        })

    })

    it("should mock and stub the api response", () => {

        cy.visit('https://dummyapi.io/explorer');

        //A StaticResponse object represents a response to an HTTP request, and can be used to stub routes:
        const staticResponse = {
            /* some StaticResponse properties here... */
            limit : 20,
            name: 'Mocked Response'
        }
         
        //cy.intercept(method, url, staticResponse)
        cy.intercept(
            'GET',                                                      //Match the route to a specific HTTP method (GET, POST, PUT, etc).
            '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10',  //Specify the URL to match.
            staticResponse                                              //By passing in a StaticResponse as the last argument, you can statically define (stub) a response for matched requests.
        ).as('comments')

        cy.get('div').contains('Comments List').click();
            
        cy.wait('@comments').then(interception => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.body.limit).eq(20)
            expect(interception.response.body.name).eq('Mocked Response')
        })
 
     })

})

