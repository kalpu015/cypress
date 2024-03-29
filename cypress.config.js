const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // for html report
  e2e: {
    watchForFileChanges : false,
    screenshotOnRunFailure : true,
    trashAssetsBeforeRuns : true,
    video : true,
    videoCompression : true,
    chromeWebSecurity: false,
    defaultCommandTimeout : 100000,

    
  
  
    setupNodeEvents(on, config) {
    
      require('cypress-mochawesome-reporter/plugin')(on);


      // implement node event listeners here
    },

  
    

    
  },
});


