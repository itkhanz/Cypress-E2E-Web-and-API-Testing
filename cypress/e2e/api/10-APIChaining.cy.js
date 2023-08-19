/***********************************************************
API Chaining in Cypress | Request Chaining | Part 9

https://www.youtube.com/watch?v=wAOQJxxFFZo&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=9

https://docs.cypress.io/api/commands/request
https://docs.cypress.io/api/commands/then

Be sure to use in your callback, either a command or a return value, but do not mix them up. :)
https://medium.com/tech-learn-share/you-are-mixing-async-and-sync-code-fix-in-cypress-b6c0b67f2e2e

************************************************************/



describe("API Chaining in Cypress", () => { 

    it('should request all posts and then get the comments for a particular post', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }).then((response) => {
            expect(response.status).to.equal(200);
            //Mixing Sync and Async commands
            cy.log(JSON.stringify(response.body)).then(() =>{
                const postID = response.body[0].id;
                return postID;
            })
        }).then((postID) => {
            cy.request({
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/comments?postId=${postID}`
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.length(5);
            });
        });
    });
    

})

