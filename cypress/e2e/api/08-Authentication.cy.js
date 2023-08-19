/***********************************************************
API Testing using Cypress | API Authentications - Basic, Digest, Bearer Token & API Key | Part 7

https://www.youtube.com/watch?v=j-WT-4TdBt0&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=7

https://docs.cypress.io/api/commands/request

Basic Auth
https://learning.postman.com/docs/sending-requests/authorization/authorization-types/#basic-auth

Digest Auth (not working in Cypress)
https://learning.postman.com/docs/sending-requests/authorization/authorization-types/#bearer-token
https://learning.postman.com/docs/sending-requests/authorization/digest-auth/
https://stackoverflow.com/questions/56853865/how-to-test-a-bad-request-in-cypress

Bearer Auth
Go to GitHub Profile -> Settings -> Developer Settings, and create a new classic token and give permission to repo (public_repo)
https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-public-repositories
https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user

API Key authentication
https://learning.postman.com/docs/sending-requests/authorization/authorization-types/#api-key
Sign In for free and copy/create an API Key to access weather API
https://openweathermap.org/api
https://openweathermap.org/forecast5 (3-hour Forecaset 5 days is included for free API)
https://openweathermap.org/price#weather


************************************************************/

// Function to extract values from the string
function extractValues(input) {
    const values = {};
    const matches = input.match(/(\w+)="([^"]+)"/g);
    
    if (matches) {
      matches.forEach(match => {
        const [key, value] = match.split('=');
        values[key.trim()] = value.slice(1, -1); // Removing quotes around the value
      });
    }
    
    return values;
}


describe("API Authentication", () => { 

    it('Basic Authentication - Postman moch server', () => {
        cy.request( 
            {
                method  : 'GET',
                url     : 'https://postman-echo.com/basic-auth',
                auth : {
                    'user' : 'postman',
                    'pass' : 'password'
                }
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)
            expect(response.body.authenticated).to.be.true

            cy.log(JSON.stringify(response.body))
        })

    })

    it.skip('Digest Authentication', () => {

        let extractedValues;
        let ext_disgestRealm;
        let ext_nonce;
        let ext_qop;

        cy.request( 
            {
                method  : 'GET',
                url     : 'https://postman-echo.com/digest-auth',
                failOnStatusCode: false,    //Whether to fail on response codes other than 2xx and 3xx
                auth : {
                    'user' : 'postman',
                    'pass' : 'password'
                },
                headers : {
                    'accept' : 'application/json'
                }
            }
        )
        .then((response) => {
            expect(response.status).to.equal(401)

            cy.log(JSON.stringify(response.headers));
            
            expect(response.headers).to.have.property('www-authenticate');

            const authenticateHeader = response.headers['www-authenticate'];            

            cy.wrap(authenticateHeader).should('be.a', 'string')

            extractedValues = extractValues(authenticateHeader);

            ext_disgestRealm = extractedValues.realm;
            ext_nonce = extractedValues.nonce;
            ext_qop = extractedValues.qop;
            cy.log('Digest realm:', ext_disgestRealm);
            cy.log('Nonce:', ext_nonce);
            cy.log('QOP:', ext_qop); 

        })

    })

    it.skip('Bearer Token Authentication - Get all public GitHub repos', () => {

        //Use your personal github token to pass as authentication bearer header
        const accessToken = "YOUR_GITHUB_PERSONAL_TOKEN"
        cy.request( 
            {
                method  : 'GET',
                url     : '  https://api.github.com/user/repos',
                headers : 
                    {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + accessToken
                    },
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)

            cy.log('Total repos: ' + response.body.length);
            cy.log('Name of first repo ' + response.body[0].name);

            cy.log(JSON.stringify(response.body))
        })

    })

    it.skip('API Key Authentication - 5 day weather forecast', () => {

        //Use your personal api key to pass as query parameter with appid key
        const API_KEY = 'YOUR_OPENWEATHER_API_KEY'
        cy.request( 
            {
                method  : 'GET',
                url     : 'api.openweathermap.org/data/2.5/forecast',
                qs      : {
                    lat : '52.52',
                    lon : '13.40',
                    appid : API_KEY
                }
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)
            const body = response.body;
            cy.log(JSON.stringify(body))

            expect(body.city).to.have.property('name', 'Mitte') //Berlin
            expect(body.city).to.have.property('country', 'DE') //Germany
            expect(body.city.coord.lat).to.eq(52.52)
            expect(body.city.coord.lon).to.eq(13.4)

            const tempList = body.list;

            cy.log('Weather forecast at ' + tempList[0]['dt_txt']);
            cy.log('Temperature : ' + tempList[0].main.temp);
            cy.log('Weather: ' + tempList[0].weather[0].main);
            cy.log('Description: ' + tempList[0].weather[0].description);
            cy.log('Wind Speed: ' + tempList[0].wind.speed);

            let avgtemp = 0;
            tempList.forEach(item => {
                avgtemp+=item.main.temp
            })
            avgtemp = avgtemp/tempList.length

            cy.log('Average Temperature over next 5 days: ' + avgtemp);
        })

    })


})

