/***********************************************************
API Testing using Cypress | How To Handle XML Payload & Parsing XML Response | Part 6

https://www.youtube.com/watch?v=7R_uPqDVsdk&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=6

https://docs.cypress.io/api/commands/request

We will use third party library to parse XML
https://www.npmjs.com/package/xml2js

Use following website to convert multiline XML to singleline
https://tools.onecompiler.com/multiline-to-singleline
************************************************************/

import { Parser } from 'xml2js';
const parser = new Parser( { explicitArray: false} );

describe("How To Handle XML Payload & Parsing XML Response", () => { 

    const reqBody = '<?xml version="1.0" encoding="UTF-8"?> <Pet> 	<id>0</id> 	<Category> 		<id>0</id> 		<name>husky</name> 	</Category> 	<name>Max</name> 	<photoUrls> 		<photoUrl>https://images.unsplash.com/photo-1617895153857-82fe79adfcd4</photoUrl> 	</photoUrls> 	<tags> 		<Tag> 			<id>0</id> 			<name>vaccinated</name> 		</Tag> 	</tags> 	<status>available</status> </Pet>';
    let petid;

    before('creating PET', () => {
        cy.request( 
            {
                method  : 'POST',
                url     : 'https://petstore.swagger.io/v2/pet',
                body      : reqBody,
                headers : {
                    'Content-Type' : 'application/xml',
                    'accept' : 'application/xml'
                }
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)

            parser.parseString(response.body, (err, result) => {
                petid = result.Pet.id;
            })

            cy.log(petid);
        })
    })

    it('fetching PET data', () => {
        cy.request( 
            {
                method  : 'GET',
                url     : 'https://petstore.swagger.io/v2/pet/' + petid,
                headers : {
                    'accept' : 'application/xml'
                }
            }
        )
        .then((response) => {

            expect(response.status).to.equal(200)

            //cy.log(response.body)

            parser.parseString(response.body, (err, result) => {

                const pet = result.Pet;
                //cy.log(pet);
                expect(pet.id).to.be.eq(petid)
                expect(pet.name).to.be.eq('Max')
            })

        })

    })


})

