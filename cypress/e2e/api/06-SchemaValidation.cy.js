/***********************************************************
API Testing using Cypress | How To Validate JSON Schema | Part 5

https://www.youtube.com/watch?v=Uiab_UvJLVA&list=PLUDwpEzHYYLtoD-O_KzRrLngmEG7BBb1n&index=5

https://docs.cypress.io/api/commands/request

JSON to JSON Schema transformation
https://transform.tools/json-to-json-schema

We will use third party library to validate the JSON Schema
https://www.npmjs.com/package/ajv


************************************************************/

import Ajv from "ajv"
const ajv = new Ajv()

describe("how to validate JSON Schema", () => { 


    it('validates the schema of products endpoint for fakerstoreapi', () => {


       cy.request( 
        {
            method  : 'GET',
            url     : 'https://fakestoreapi.com/products/'
        }
       )
       .then((response) => {

        const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
                "type": "object",
                "properties": {
                    "id": {
                    "type": "number"
                    },
                    "title": {
                    "type": "string"
                    },
                    "price": {
                    "type": "number"
                    },
                    "description": {
                    "type": "string"
                    },
                    "category": {
                    "type": "string"
                    },
                    "image": {
                    "type": "string"
                    },
                    "rating": {
                    "type": "object",
                    "properties": {
                        "rate": {
                        "type": "number"
                        },
                        "count": {
                        "type": "number"
                        }
                    },
                    "required": [
                        "rate",
                        "count"
                    ]
                    }
                },
                "required": [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                ]
                }
            };

            expect(response.status).to.equal(200)

            const validate = ajv.compile(schema)
            const valid = validate(response.body)

            expect(valid).to.be.true;
        })


    })
})

