/***********************************************************
Filtering tests with tags

@cypress/grep allows us to run selected tests based on the title or by using tags

Filter with tags
You can select tests to run or skip using tags by passing --env grepTags=... value.

https://www.npmjs.com/package/@cypress/grep
https://github.com/cypress-io/cypress/tree/develop/npm/grep
https://www.programsbuzz.com/article/cypress-grep-plugin


************************************************************/

describe("filtering tests", () => { 

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/');
    });

    it('is a random test - TC1', () => {
        cy.log('I am a random test');
    });


    //npx cypress run --env grep="dummy" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //This will only run tests with "dumy" in  their name, remaining tests will stay pending
    it("is a dummy test - TC2", {tags: '@dummy'}, () => {
        cy.log('Run the test which includes "dummy" in its title');
    });


    //npx cypress run --env grepTags="@smoke" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //This will only run the tests tagged as smoke
    it('is a smoke test - TC3', {tags: '@smoke'}, () => {
        cy.log('Run the tests which have smoke tag');
    });

    //npx cypress run --env grepTags="@regression" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //This will only run the tests tagged as regression
    it('is a regression test - TC4', {tags: '@regression'}, () => {
        cy.log('Run the tests which have regression tag');
    });


    //AND tags
    //Use + to require both tags to be present
    //npx cypress run --env grepTags="@smoke+@regression" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //This will run the tests that are tagged as both smoke and regression i.e. TC5
    it('is both a smoke and regression test - TC5', {tags: ['@regression', '@smoke']}, () => {
        cy.log('Run the tests which have both smoke and regression tag');
    });

    //OR tags
    //You can run tests that match one tag or another using spaces. Make sure to quote the grep string!
    //npx cypress run --env grepTags="@smoke @regression" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //This will run the tests that are tagged either smoke or regression
    //So this wil run TC3, TC4 and TC5

    //Inverted tags
    //You can skip running the tests with specific tag using the invert option: prefix the tag with the character -.
    //npx cypress run --env grepTags="-@dummy" --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //It will not run any tests with tag "@dummy" so all the other tests will run except TC2

    //If you want to run all tests with tag @regression but without tag @smoke:
    //npx cypress run --env grepTags=@regression+-@smoke --spec cypress\e2e\ui\24-FilteringTests.cy.js
    //only TC4 will run in this case
    
})

