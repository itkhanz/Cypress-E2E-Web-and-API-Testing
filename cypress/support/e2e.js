// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/// <reference types="Cypress" />
import 'cypress-iframe';
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

import 'cypress-mochawesome-reporter/register'; //cypress-mochawesome-reporter

import 'cypress-plugin-api';

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()


//https://stackoverflow.com/questions/53845493/cypress-uncaught-assertion-error-despite-cy-onuncaughtexception
//prevents failure of test on console errors while loading website
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})