/***********************************************************
Read CSV Data In Cypress

Cypress plugin for effective API testing. Imagine Postman, but in Cypress. Prints out information about the API call in the Cypress App UI.

https://npm.io/package/neat-csv
https://www.npmjs.com/package/neat-csv
https://www.npmjs.com/package/@faker-js/faker
https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests-from-csv

https://medium.com/@anshita.bhasin/read-csv-data-in-cypress-57b1792c6945
https://github.com/Anshita-Bhasin/Cypress_Read_Data_From_CSV
https://www.youtube.com/watch?v=8h1pUyVHqn0
https://www.youtube.com/watch?v=8nhCF_Jc45k

Sample Forms:
https://practice.sdetunicorns.com/contact/
https://demoqa.com/automation-practice-form
https://www.globalsqa.com/samplepagetest/

Pre -requirsites:
    npm install neat-csv@v5
    Install neat-csv package (v5)
    any version above v5 is not supported  by cypress in your test files
Read File using Cypress command:
    readFile() / fixture()

************************************************************/

const csv = require('neat-csv');
//import csv from 'neat-csv';s


describe("Reading CSV file using fixture", () => { 

    let formData;   //An array of objects

    before(() => {
        //Read csv data from fixture
        cy
         .fixture('demoform.csv')
         .then(csv) //converts csv file into an object
         .then(data => {
            formData = data;    //assigns the data to a global variable to use later in  tests
         })
         .then(console.table)   //prints the data as table in console
    })

    it("should fill and submit the form with hard coded data", () => {
        cy.visit('https://www.globalsqa.com/samplepagetest/');

        cy.get("#g2599-name").type("Tom");
        cy.get("#g2599-email").type("tom@test.com");

        cy.get("#g2599-experienceinyears").select("1-3");

        cy.get("input[value='Automation Testing'][type='checkbox']").check();

        cy.get("input[value='Post Graduate'][type='radio']").check();

        cy.get('#contact-form-comment-g2599-comment').type("I am a test");

        cy.get("button[type='submit']").click();

        cy.get('.contact-form-submission p').contains("Name: ").should('contain.text', 'Name: Tom');

    });

    it("should submit form for each user with CSV data loaded from fixture", () => {

        formData.forEach((form) => {  
            cy.visit('https://www.globalsqa.com/samplepagetest/');

            cy.get("#g2599-name").type(form.name);
            cy.get("#g2599-email").type(form.email);

            cy.get("#g2599-experienceinyears").select(form.experience);

            cy.get(`input[value='${form.expertise}'][type='checkbox']`).check();

            cy.get(`input[value='${form.education}'][type='radio']`).check();

            cy.get('#contact-form-comment-g2599-comment').type(form.comment);

            cy.get("button[type='submit']").click();

            cy.get('.contact-form-submission p').contains("Name: ").should('contain.text', `Name: ${form.name}`);
        })

    });

    
})

