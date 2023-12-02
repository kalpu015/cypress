/// <reference types ="cypress"/>
// homePage.js
class HomePage {
    visit() {
      cy.visit('https://www.leaffilter.com');
    }
  
    // Add more functions for interacting with elements on the home page
  }
  
  export default new HomePage();
  