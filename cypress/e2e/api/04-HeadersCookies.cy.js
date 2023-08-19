/***********************************************************
API Testing using Cypress | Query Parameters, Headers, Cookies & Bearer Token Auth | Part 3

https://www.youtube.com/watch?v=kdXmNTjYVUo&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=3

https://docs.cypress.io/api/commands/request
headers : Additional headers to send; Accepts object literal. 
Note: headers will only be sent for the initial request for cy.request(), not for any subsequent requests.

https://docs.cypress.io/api/commands/getcookie
https://docs.cypress.io/api/commands/setcookie

************************************************************/
import { faker } from "@faker-js/faker";


describe("Passing headers and cookies with Cypress Request", () => { 

    let accessToken;
    let oId;
    const createOrderBody = {
        bookId : 1,
        customerName : faker.person.firstName()
    };

    before(() => {

        const getTokenBody = {
            clientName : faker.person.firstName(),
            clientEmail : faker.internet.email()
        }

        /*********************************/
        //Request to Generate Access Token
        /*********************************/
        cy.request( 
            {
                method  : 'POST',
                url     : 'https://simple-books-api.glitch.me/api-clients/',
                headers : 
                    {
                        'Content-Type' : 'application/json'
                    }, 
                body      : getTokenBody
            }
           )
        .then((response) => {

            expect(response.status).to.equal(201)
            expect(response.body).has.property('accessToken')
            accessToken = response.body.accessToken;
            cy.log('access token is ', accessToken);

            /*********************************/
            //Request to Create Book Order
            /*********************************/
            cy.request( 
            {
                method  : 'POST',
                url     : 'https://simple-books-api.glitch.me/orders/',
                headers : 
                    {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + accessToken
                    }, 
                body    : createOrderBody   
            }
            )
            .then((response) => {
    
                expect(response.status).to.equal(201)
    
                const body = response.body;
    
                expect(body).property('created').to.be.true
                expect(body).to.have.property('orderId')
    
                oId = response.body.orderId;
        
    
                cy.log('Response of Submitting Order');
                cy.log(JSON.stringify(body));
            })
        })
    })



    it('Retrieves the created Order details', () => {

       
        /*********************************/
        //Request to Get created Book Order
        /*********************************/

        cy.request( 
        {
            method  : 'GET',
            url     : 'https://simple-books-api.glitch.me/orders/',
            headers : 
                {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }, 
            qs      : 
                {
                    orderId : oId
                }
        })
        .then((response) => {

            expect(response.status).to.equal(200)

            const body = response.body[0];

            expect(body).to.have.property('quantity', 1)
            expect(body).to.have.property('id', oId)
            expect(body).to.have.property('bookId', createOrderBody.bookId)
            expect(body).to.have.property('customerName', createOrderBody.customerName)
            expect(body).has.property('timestamp')


            cy.log('Response of Getting Created Order');
            cy.log(JSON.stringify(body));
                
        })

    })

    it('Fetches all orders', () => {

       
        /*********************************/
        //Request to Get created Book Order
        /*********************************/

        cy.setCookie('cookieName', 'myCookie')

        cy.request( 
        {
            method  : 'GET',
            url     : 'https://simple-books-api.glitch.me/orders/',
            headers : 
                {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
        })
        .then((response) => {

            expect(response.status).to.equal(200)
            expect(response.body).to.have.length(1)
       
            cy.log('Response of getting all orders');
            cy.log(JSON.stringify(response));

            cy.getCookie('cookieName')
            .should('exist')
            .and('have.property', 'value', 'myCookie')
            
                
        })

    })


})

