/***********************************************************
API Testing using Cypress | API Authentications - OAuth 2.0 Authentication-GitHub App | Part 8

https://www.youtube.com/watch?v=1D-0osk4K9w&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=8

https://docs.cypress.io/api/commands/request

OAuth 2.0 authentication
https://learning.postman.com/docs/sending-requests/authorization/oauth-20/

We will use GitHub to test OAuth API Authentication
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

Go to GitHub Profile -> Settings -> Developer Settings -> OAuth Apps, and create a new oauth application 
and get ClientID and Client Secret


//Pre-requisite: generate Auth Code by visiting the URL in browser and copy Code from URL
//This step must be carried out manually
//https://github.com/login/oauth/authorize/{client_id}
e.g. https://github.com/login/oauth/authorize?client_id=

Step 01: Get the OAuth access token
POST https://github.com/login/oauth/access_token
Query Params: client_id, client_secret, code
https://github.com/login/oauth/access_token?client_id=&client_secret=&code=

Step 02: Send GET request by using POST token
https://api.github.com/user/repos
Auth: accessToken

************************************************************/



describe("API Authentications - OAuth 2.0 Authentication", () => { 

    let accessToken = '';
    let CLIENT_ID = '';
    let CLIENT_SECRET = '';
    let CODE = '';    //Has to be generated manually before making API Call

    before('get OAuth2 access token', () => {
        cy.request( 
            {
                method  : 'POST',
                url     : 'https://github.com/login/oauth/access_token',
                qs : {
                    'client_id' : CLIENT_ID,
                    'client_secret' : CLIENT_SECRET,
                    'code' : CODE
                }
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)
            cy.log(JSON.stringify(response.body))

            const params = response.body.split('&')
            accessToken = params[0].split('=')[1];

            expect(accessToken).to.not.eq('bad_verification_code')

            cy.log('Access Token is: ' + accessToken);
            
        })

    })

    it('Make OAuth2 request - get all repos for user', () => {
        cy.request( 
            {
                method  : 'GET',
                url     : 'https://api.github.com/user/repos',
                headers : 
                    {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + accessToken
                    },
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)
            expect(response.body[0]).has.property('id')
            expect(response.body[0]).has.property('node_id')
            expect(response.body[0]).has.property('name')
            expect(response.body[0]).has.property('full_name')

            expect(response.body[0].owner).to.have.property('login', 'YOUR_GITHUB_USERNAME') //your github username

            cy.log('Total repos: ' + response.body.length);


            cy.log(JSON.stringify(response.body))
            
        })

    })

})

