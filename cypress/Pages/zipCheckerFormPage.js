
// zipCheckerFormPage.js
class zipCheckerFormPage {

  fillZipCodeEmpty(EmptyCode)
  {
    cy.get(cy.get('.btn-estimate').click());
    cy.get('.error-msgs').should('have.text','Zip Code is required.')
    //cy.screenshot();
  }

    fillZipCode(validZipCode) {

      cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > div:nth-child(2) > input').clear().type(validZipCode);
     
    }

    fillZipCodeinvalid(invalidZipCode) {

      cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > div:nth-child(2) > input').type(invalidZipCode);
      cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > div:nth-child(2) > input').type('{enter}');
      cy.get('form > div:nth-child(2) > p').should('have.text','ZIP Code must be a 5-digit number.')

      //cy.get('.position-relative > .field-container > .input-field').clear().type(invalidZipCode);
      //cy.get(cy.get('.btn-estimate').click());
      //cy.get('.error-msgs').should('have.text','ZIP Code must be a 5-digit number.')
      //cy.screenshot('Invalid');
      //cy.wait(30000)
     
    }

    fillInvalidName(invalidName)
    { 
     cy.get('.css-8ts2me > .input-field').type(invalidName);
     cy.get(':nth-child(4) > .input-field').type(email);
     cy.get('.error-msg').should('have.text','Full Name must include both First Name and Last Name.')

    }

     clickGetEstimate() {
      cy.get('.btn-estimate').should('be.visible');
      cy.get('.btn-estimate').click({force:true});
      
      cy.log('pass');      
      cy.wait(3000);

     }
  
    
  
    // Add more functions for interacting with elements on the zip checker form page
  }
  
  export default new zipCheckerFormPage();
  