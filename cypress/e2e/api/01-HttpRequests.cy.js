/***********************************************************
API Testing using Cypress | HTTP Methods | Part 1
https://www.youtube.com/watch?v=zWO1-XkhaRw&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=1

https://docs.cypress.io/api/commands/request

https://filiphric.com/cypress-basics-api-testing
https://filiphric.com/working-with-api-response-data-in-cypress
https://www.npmjs.com/package/cypress-plugin-api
https://www.npmjs.com/package/@bahmutov/cy-api

Demo API Testing Pactice Sites
https://restful-booker.herokuapp.com/apidoc/index.html
https://reqres.in/
http://httpbin.org/
https://jsonplaceholder.typicode.com/
https://petstore.swagger.io/#/


************************************************************/
//Run via commandline
//npx cypress run --spec cypress/e2e/api/01-HttpRequests.cy.js --browser chrome --headed
//or via Cypress Test Runner

describe("HTTP Requests", () => { 

    it('GET Call', () => {

         /* cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
            .its('status').should('equal', 200) */

        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {

            expect(response.status).to.equal(200)

            const body = response.body;

            expect(body).to.have.property('id')
            expect(body).to.have.property('userId')
            expect(body).to.have.property('title')

            cy.log(body.title)
        })

    })

    it('POST Call', () => {

        //If you pass two arguments into .request() command, the first argument will be considered a method, and the second one will be a url.
        //.request() command can take maximum of 3 arguments.
        //As per Cypress, only the data value should be in singlr or double quotes, and not the keys in request body
       
        /* cy.request(
        'POST',
        'https://jsonplaceholder.typicode.com/posts/',
        {
            title : 'Test Post',
            body : 'This is post call',
            userId : 1
        }
        )
       .then((response) => {

           expect(response.status).to.equal(201)

           const body = response.body;

           expect(body).property('userId').to.equal(1)
           expect(body).property('title').to.equal('Test Post')
           expect(body).property('body').to.equal('This is post call')

       }) */


       //If you want to pass some more options or just provide your .request command a little more context, you can pass a single object. 
       //The same request from previous example can be written like this:
       cy.request( {
        method  : 'POST',
        url     : 'https://jsonplaceholder.typicode.com/posts/',
        body    : {
                    title : 'Test Post',
                    body : 'This is post call',
                    userId : 1
                }
       })
       .then((response) => {

           expect(response.status).to.equal(201)

           const body = response.body;

           expect(body).property('userId').to.equal(1)
           expect(body).property('title').to.equal('Test Post')
           expect(body).property('body').to.equal('This is post call')

       })

   })

   it('PUT Call', () => {

        cy.request( {
            method  : 'PUT',
            url     : 'https://jsonplaceholder.typicode.com/posts/1',
            body    : {
                        title : 'Test Post updated',
                        body : 'This is put call',
                        id : 1,
                        userId : 1
                    }
        })
        .then((response) => {

            expect(response.status).to.equal(200)

            const body = response.body;

            expect(body).property('userId').to.equal(1)
            expect(body).property('title').to.equal('Test Post updated')
            expect(body).property('body').to.equal('This is put call')

        })

    })

    it('DELETE Call', () => {

        cy.request( {
            method  : 'DELETE',
            url     : 'https://jsonplaceholder.typicode.com/posts/1',
        })
        .then(({status, statusText}) => {
            //Above response is destructured to directly use the response fields
            //https://filiphric.com/using-destructuring-in-cypress

            expect(status).to.equal(200)
            expect(statusText).to.be.ok

        })
    
    })

})

