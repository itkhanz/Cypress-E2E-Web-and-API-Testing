/***********************************************************
API Testing using Cypress | Different ways to create Post request Body | Part 2

https://www.youtube.com/watch?v=kZwlqzh-k9w&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=2

************************************************************/

import { faker } from "@faker-js/faker";

describe("Different ways to create Post request Body", () => { 


    it('Approach1 - Hard coded json request body', () => {

        const reqBody = {
            name : 'Mike',
            job : 'engineer',
        };

       cy.request( 
        {
            method  : 'POST',
            url     : 'https://reqres.in/api/users',
            body    : reqBody
        }
       )
       .then((response) => {

           expect(response.status).to.equal(201)

           const body = response.body;

           expect(body).property('name').to.equal('Mike')
           expect(body).property('job').to.equal('engineer')
           expect(body).to.have.property('createdAt')
           expect(body).to.have.property('id')

           cy.log(JSON.stringify(body));
           
       })

   })

   it('Approach2 - Dynamically generate json request body', () => {

        //Generate random data with faker-js library
        //https://www.npmjs.com/package/@faker-js/faker
        //https://fakerjs.dev/api/person.html#jobarea


        const reqBody = {
            name : faker.person.firstName(),
            job : faker.person.jobArea(),
        };

        cy.request( 
            {
                method  : 'POST',
                url     : 'https://reqres.in/api/users',
                body    : reqBody
            }
        )
        .then((response) => {

            expect(response.status).to.equal(201)

            const body = response.body;

            expect(body).property('name').to.equal(reqBody.name)
            expect(body).property('job').to.equal(reqBody.job)
            expect(body).to.have.property('createdAt')
            expect(body).to.have.property('id')

            cy.log(JSON.stringify(body));
            
        })

    })


    it('Approach3 - Get JSON request body from fixtures', () => {


        //loads the user.json located inside cypress/fixtures directory
        cy.fixture('user').then((user) => {

            const reqBody = user;
    
            cy.request( 
                {
                    method  : 'POST',
                    url     : 'https://reqres.in/api/users',
                    body    : reqBody
                }
            )
            .then((response) => {
    
                expect(response.status).to.equal(201)
    
                const body = response.body;
    
                expect(body).property('name').to.equal(reqBody.name)
                expect(body).property('job').to.equal(reqBody.job)

                //both are different ways to validate the presence of key
                expect(body).to.have.property('createdAt')
                expect(body).has.property('id')
    
                cy.log(JSON.stringify(body));
                
            })

        })
        
    })


})

