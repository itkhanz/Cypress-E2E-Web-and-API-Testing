/***********************************************************
API Testing using Cypress | Query Parameters, Headers, Cookies & Bearer Token Auth | Part 3

https://www.youtube.com/watch?v=kdXmNTjYVUo&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=3

https://docs.cypress.io/api/commands/request
qs : Query parameters to append to the url of the request


************************************************************/


describe("Query Paramters in Cypress Request", () => { 


    it('validates the list of users', () => {


       cy.request( 
        {
            method  : 'GET',
            url     : 'https://reqres.in/api/users',
            qs      : 
                {
                    page : 2
                }
        }
       )
       .then((response) => {

           expect(response.status).to.equal(200)

           const body = response.body;

           expect(body).property('page').to.equal(2)
           expect(body).property('per_page').to.equal(6)
           expect(body).to.have.property('total')
           expect(body).to.have.property('total_pages')
           expect(body.data).to.have.length(6)   
           expect(body.data[0].first_name).to.eq('Michael')
           expect(body.data[0]).has.property('last_name', 'Lawson')

           cy.log(JSON.stringify(body.data[0]));
           
       })

   })


})

