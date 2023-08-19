// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getIFrame', (iframe) => {
    return cy.get(iframe)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
})

/**
 * A custom command to check whether the element is not visible within the viewport.
 * https://github.com/cypress-io/cypress/issues/877
 */
Cypress.Commands.add("isNotInViewport", { prevSubject: true }, (element) => {
    const message = `Did not expect to find ${element[0].outerHTML} in viewport`;
  
    cy.get(element).should(($el) => {
      const bottom = Cypress.$(cy.state("window")).height();
      const rect = $el[0].getBoundingClientRect();
  
      expect(rect.top).to.be.greaterThan(bottom, message);
      expect(rect.bottom).to.be.greaterThan(bottom, message);
      expect(rect.top).to.be.greaterThan(bottom, message);
      expect(rect.bottom).to.be.greaterThan(bottom, message);
    });
  });
  
Cypress.Commands.add("isInViewport", { prevSubject: true }, (element) => {
    const message = `Expected to find ${element[0].outerHTML} in viewport`;

    cy.get(element).should(($el) => {
        const bottom = Cypress.$(cy.state("window")).height();
        const rect = $el[0].getBoundingClientRect();

        expect(rect.top).not.to.be.greaterThan(bottom, message);
        expect(rect.bottom).not.to.be.greaterThan(bottom, message);
        expect(rect.top).not.to.be.greaterThan(bottom, message);
        expect(rect.bottom).not.to.be.greaterThan(bottom, message);
    });
});


//This command is useful because after clicking on download link the page waits to load continously
Cypress.Commands.add("suppressWaitForPageLoad", function () {
	cy.intercept("*", req => {
		req.on("before:response", res => {
			const isDownload = res.headers["content-disposition"]?.startsWith("attachment");
			// Need to exclude requests not made by the application, such as
			// background browser requests.
			const origin = cy.getRemoteLocation("origin");
			const isFromAUT = req.headers["referer"]?.startsWith(origin);
			if (isDownload && isFromAUT) {
				Cypress.log({
					name: "suppressWaitForPageLoad",
					message: "Bypassing wait for page load event because response has Content-Disposition: attachment"
				});
				cy.isStable(true, "load");
			}
		});
	});
});

//Clicking on link using text
Cypress.Commands.add('clickLinkByText', (text) => {
  cy.get('a').contains(text).click();
})

//overwrite contains() query to make it case-insensitive
// Custom case-insensitive contains() query
//https://stackoverflow.com/questions/75670135/getting-an-error-using-cypress-commands-overwritequery
Cypress.Commands.overwriteQuery(
  "contains",
  function (contains, filter, text, userOptions = {}) {

    // This is parameter resolution from Cypress v12.7.0 source
    if (Cypress._.isRegExp(text)) {
      // .contains(filter, text)
      // Do nothing
    } else if (Cypress._.isObject(text)) {
      // .contains(text, userOptions)
      userOptions = text
      text = filter
      filter = ''
    } else if (Cypress._.isUndefined(text)) {
      // .contains(text)
      text = filter
      filter = ''
    }

    userOptions.matchCase = false;

    return contains.call(this, filter, text, userOptions)
  }
)

//custom command for login
Cypress.Commands.add('loginToOrangeHRM', function(username, password) {
  cy.get("input[name='username']").type(username);
  cy.get("input[name='password']").type(password);
  cy.get("button[type='submit']").click();

})

