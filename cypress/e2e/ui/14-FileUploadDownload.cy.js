/***********************************************************
Handling File Upload in Cypress
Files to be uploaded must be kept under fixtures folder
attachFile() method looks for file under fixtures folder

https://www.cypress.io/blog/2022/01/19/uploading-files-with-selectfile/
https://docs.cypress.io/api/commands/selectfile?ref=cypress.io
https://www.npmjs.com/package/cypress-file-upload
https://www.browserstack.com/guide/cypress-test-file-upload
https://docs.cypress.io/api/commands/shadow
https://docs.cypress.io/guides/references/configuration#Global
https://docs.cypress.io/api/commands/readfile
https://glebbahmutov.com/cypress-examples/commands/files.html#cy-fixture-or-require
https://stackoverflow.com/questions/66478056/cypress-how-to-verify-if-a-file-is-downloaded
https://stackoverflow.com/questions/72782444/wait-for-page-to-load-after-click-on-download-button
https://github.com/cypress-io/cypress/issues/14857
https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Download-Files


************************************************************/

/// <reference types="Cypress" />
import 'cypress-iframe';
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';



describe("File Uploads", () => { 

    it('Single File Upload', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');

        cy.get('#file-upload').attachFile('file1.txt');
        cy.get('#file-submit').click();
        cy.get('.example h3').should('have.text', 'File Uploaded!');

    });


    it('Fie Upload - Rename', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');

        //rename the file before uploading
        cy.get('#file-upload').attachFile(
            { filePath: 'file1.txt', fileName: 'myfile.txt'}
        );
        cy.get('#file-submit').click();
        cy.get('.example h3').should('have.text', 'File Uploaded!');

    });


    it('File Upload - Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');

        //upload the file with drag and drop
        cy.get('#drag-drop-upload').attachFile('file1.txt', 
            { subjectType: 'drag-n-drop'}
        );

        cy.get('.dz-filename').should('have.text', 'file1.txt');        

    });


    it('Multiple files upload', () => {
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php');

        cy.get('#filesToUpload').attachFile(['file1.txt', 'file2.txt']);
        cy.wait(2000);
        cy.get('p').contains('Files You Selected:');

    });


    it('File Upload - Shadow DOM', () => {
        cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/');

        //cy.get('.smart-browse-input', {includeShadowDom:true} ).attachFile('file1.txt');

        cy.frameLoaded('.demo-frame');   //loads the frame using plugin

        cy
        .iframe(".demo-frame")
        .find(".smart-ui-component").shadow()
        .find('.smart-browse-input')
        .attachFile('file1.txt');

        cy.wait(2000);

        cy
        .iframe(".demo-frame")
        .find(".smart-ui-component").shadow()
        .find('.smart-item-name')
        .contains('file1.txt');

    });
    

    it('File Download', () => {
        cy.visit('https://the-internet.herokuapp.com/download');

        cy.suppressWaitForPageLoad();
        cy.get('a').contains('some-file.txt').click();
        //cy.wait(2000);
        const downloadsFolder = Cypress.config("downloads");
        cy.readFile('cypress\\Downloads\\some-file.txt').should('include', 'I am a test file');

    });
        

    
})
