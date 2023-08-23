const { defineConfig } = require("cypress");

module.exports = defineConfig({

  //cypress-mochawesome-reporter
  reporter: 'cypress-mochawesome-reporter',  
  reporterOptions: {
    charts: true, //Genarates Chart in HTML report
    reportPageTitle: 'Cypress Mochawesome Report', //Report title will be set to the mentioned string
    embeddedScreenshots: true, //Screenshot will be embedded within the report
    inlineAssets: true, //No separate assets folder will be created
    videoOnFailOnly: false, //If Videos are recorded and added to the report, setting this to true will add the videos only to tests with failures.
  },

  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here

      require('cypress-mochawesome-reporter/plugin')(on);  //cypress-mochawesome-reporter
      
      require('@cypress/grep/src/plugin')(config);
      return config;

    },
  },
});
