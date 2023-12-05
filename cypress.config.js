const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // for html report
  e2e: {
    watchForFileChanges : false,
    screenshotOnRunFailure : true,
  
  
    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      



      // implement node event listeners here
    },

    
  },
});


