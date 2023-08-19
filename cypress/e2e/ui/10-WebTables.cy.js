// ***********************************************************
// Handling Web Tables in Cypress
// 
// https://glebbahmutov.com/blog/cy-table/
// https://glebbahmutov.com/cypress-examples/#testing-tables
// https://docs.cypress.io/api/commands/log
// https://docs.cypress.io/api/commands/within
// https://docs.cypress.io/api/commands/wrap
// https://docs.cypress.io/api/commands/each
//

// ***********************************************************

/// <reference types="Cypress" />
import 'cypress-iframe';


describe("Handling Tables", () => { 

    beforeEach('Login', () => {
        cy.visit('https://demo.opencart.com/admin/index.php');

        //login
        cy.get('#input-username').type('demo');
        cy.get('#input-password').type('demo');
        cy.get("button[type='submit']").click();

        //close the security notification
        cy.get(".btn-close").click();

        //Go to Customers tab in sidebar
        cy.get("#menu-customer>a").click();

        //click on Customers sub menu
        //cy.get("#menu-customer li:first-child a:first-child").click();
        cy.get("#menu-customer").children().contains("Customers").click();


    });
    
    

    it('Check Number Rows and Columns', () => {

        //verify number of columns
        cy.get("#form-customer thead>tr>td").should('have.length', 7)
        //verify number of rows
        cy.get("#form-customer tbody>tr").should('have.length', 10)

    });

    it('Check cell data from specific row and column', () => {

        //Get data from 3rd column (Email) amd 5th Row
        cy.get("#form-customer tbody>tr:nth-of-type(5)>td:nth-child(3)")
        .contains('demo234566@gmail.com')

    });


    it('Read all the rows and columns data in the first page', () => {

        
        //First way
        /* cy.get("#form-customer tbody>tr").each(($row, index, $rows) => {
            cy.wrap($row).get("td.text-start").each(($col, index, $cols) => {
                cy.log($col.text())
            })
        }) */

        //Second way
        //Iterate through an array like structure (arrays or objects with a length property).
        cy.get("#form-customer tbody>tr").each(
            ($row, index, $rows) => {

            //Within Scopes all subsequent cy commands to within this element
            cy.wrap($row).within( () => {

                cy.get("td.text-start").each(($col, index, $cols) => {
                        cy.log($col.text())
                })
            })
           
        })

    });

    it('finds the total number of pages', () => {

        let totalPages;
        cy.get("#form-customer>div.row>div.text-end").then((el) => {
            let fullText = el.text();
            totalPages=fullText.substring(fullText.indexOf("(")+1 , fullText.indexOf("Pages")-1);
            cy.log("Total number of pages in a table: " + totalPages);
        })

    })

    it('Print all the emails in table on each page', () => {
        
        //Get the email from the table on every page
        //Loop through all the pages (as there are too many pages, so we read from 5 pages)

        const maxPagesToRead = 5;
        for(let i = 1; i <= maxPagesToRead; i++) {
            cy.log("Active Page is: " + i)

            //Read all the rows and columns of a table on page
            cy.get("#form-customer tbody>tr").each(
                ($row, index, $rows) => {
    
                //Within Scopes all subsequent cy commands to within this element
                cy.wrap($row).within( () => {
    
                    //print the email
                    cy.get("td:nth-child(3)").then((el) => {
                            cy.log(el.text())
                    })
                })
               
            })

            //click on the next Page
            if(i + 1 <= maxPagesToRead) {
                cy.get("ul.pagination .page-link").contains(i+1).click();
                //cy.wait(3000);
            }
        }

    });

    
})
