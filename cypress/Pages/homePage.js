/// <reference types ="cypress"/>
// homePage.js
class HomePage {
    visit() {
      cy.visit('https://www.leaffilter.com');
      cy.get('.text-shadow').should('be.visible');
      
    }
    // Add more functions for interacting with elements on the home page
  }

  class HomeSafe{
    visit(){
      cy.visit('https://www.leafhomesafetysolutions.com/');
    
      
    }
  }

  export const urls = {
    HomePage: 'https://www.leaffilter.com',
    HomeSafe: 'https://www.leafhomesafetysolutions.com/',

    // Add more URLs as needed
  };
  
  export default new HomePage();
  
  