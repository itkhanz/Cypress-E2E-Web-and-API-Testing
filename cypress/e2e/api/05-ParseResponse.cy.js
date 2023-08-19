/***********************************************************
API Testing using Cypress | Parsing JSON Response Body | Part 4

https://www.youtube.com/watch?v=-PjpXAMsS3M&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=4

https://docs.cypress.io/api/commands/request


************************************************************/


describe("parsing JSON response body", () => { 


    it('parsing simple JSON response', () => {


       cy.request( 
        {
            method  : 'GET',
            url     : 'https://fakestoreapi.com/products/',
            qs      : 
                {
                    limit : 5
                }
        }
       )
       .then((response) => {

           expect(response.status).to.equal(200)

           expect(response.body).to.have.length(5)

           const data = response.body[0];
           
           cy.log(JSON.stringify(data));

           expect(data.id).to.eq(1)
           expect(data.title).to.eq('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
           expect(data.price).to.eq(109.95)
           expect(data.rating.rate).to.eq(3.9)

        
           let prices = [];

           response.body.forEach(product => {
            prices.push(product.price)
            expect(product.price).to.be.lessThan(700)
           });

           //Print the content of array to console
           //Method 1
           cy.log(JSON.stringify(prices));
           //Method 2
           cy.log(prices.join(', '));
       })

   })


})

