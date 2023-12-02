
// zipCheckerFormPage.js
class zipCheckerFormPage {

    fillZipCode(validZipCode) {
      cy.get('#estimate_step1_postal').clear().type(validZipCode);
      cy.wait(30000)
     
    }

    fillZipCodeinvalid(invalidZipCode) {
      cy.get('#estimate_step1_postal').clear().type(invalidZipCode);
      cy.wait(30000)
     
    }

     clickGetEstimate() {
      cy.get('[id="estimate_step1"] button').should('be.visible');
      cy.get('[id="estimate_step1"] button').click({force:true});
      
      cy.log('pass');      
      cy.wait(3000);

     }
  
    
  
    // Add more functions for interacting with elements on the zip checker form page
  }
  
  export default new zipCheckerFormPage();
  