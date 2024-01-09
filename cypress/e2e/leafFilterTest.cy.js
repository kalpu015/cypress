import homepage, {urls} from '../Pages/homePage';
import zipCheckerFormPage from "../Pages/zipCheckerFormPage";

describe('LeafFilter Zip Checker Form Tests', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  
  let testData;
  
    beforeEach(() => {
      // Load test data from the fixture
      cy.fixture('test-data.json').as('testData');
  
      cy.visit(urls.HomePage);
      cy.wait(40000);
  
    })

    it('Navigates to the page and checks Zip Checker form', function() {

        cy.get('#post-14151 > section > div > section:nth-child(2) > div > section > div.section-panel__content.d-flex.flex-column.justify-content-center.w-100.p-5.accent-enabled > h2').scrollIntoView();
        cy.get('button[class="btn btn-primary"]').click();

        // zipcode - screen 1
        const invalidZipCode = this.testData.zipCodeData.invalidZipCode;
        const validZipCode = this.testData.zipCodeData.validZipCode;
        const invalidName = this.testData.userData.invalid.NameInvalid;
        const email = this.testData.userData.valid.email;
        const validName = this.testData.userData.valid.Name;
        const phoneNumber = this.testData.phoneNumber.validPhoneNumber;
    
        
        zipCheckerFormPage.fillZipCodeinvalid(invalidZipCode);
        zipCheckerFormPage.fillZipCode(validZipCode);

        cy.get('div.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > fieldset > div > label:nth-child(1) > svg').click();
        cy.get('div.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > div:nth-child(6) > div > label:nth-child(1) > svg').click();

         cy.get('.MuiDialogContent-root > .leaffilter-forms > .MuiContainer-root > .MuiPaper-root > .flex > :nth-child(7) > div.mx-auto > .d-flex > :nth-child(1) > .progress-bar')
        .should('have.css','background-color','rgb(0, 133, 62)');

    // Click on a button and wait
    cy.get('.MuiDialogContent-root > .leaffilter-forms > .MuiContainer-root > .MuiPaper-root > .flex > :nth-child(7) > .btn').click();
    cy.wait(10000);

    // Navigate to the second screen
cy.get('div.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > form > div.MuiBox-root.css-1qm1lh > label')
.should('have.text', 'Which of these applies? (optional)');

// Select an option on the second screen
cy.get(':nth-child(2) > .MuiBox-root > :nth-child(2)').click();

// Verify the progress bar color
const expectedProgressBarColor = 'rgb(0, 133, 62)';
cy.get('.flex > div.mx-auto > .d-flex > :nth-child(3) > .progress-bar')
.should('have.css', 'background-color', expectedProgressBarColor);

// Continue to the next step
cy.get('.flex > .btn').click();

// Navigate to the third screen
cy.get('.MuiDialogContent-root > .leaffilter-forms > .MuiContainer-root > .MuiPaper-root > form > :nth-child(1)')
  .should('have.text', ' Who are we personalizing this estimate for ? ');

// Click the button to proceed
cy.get('form > .btn').click();

// Error message for mandatory fields
cy.get('.css-8ts2me > .error-msg').should('have.text', 'Full Name is required.');
cy.get(':nth-child(4) > .error-msg').should('have.text', 'Email Address is required.');

// Enter Data 
cy.get('.css-8ts2me > .input-field').type(invalidName);
cy.get(':nth-child(4) > .input-field').type(email);

// Check error message for invalid full name
cy.get('.error-msg').should('have.text', 'Full Name must include both First Name and Last Name.');

// Clear and enter a valid name
cy.get('.css-8ts2me > .input-field').clear().type(validName);

// Check the progress bar color
cy.get('form > div.mx-auto > .d-flex > :nth-child(5) > .progress-bar')
  .should('have.css', 'background-color', 'rgb(0, 133, 62)');

// Continue to the next step
cy.get('form > .btn').click();

// Enter Phonenumber and submit form 
cy.get('.justify-center > .btn').scrollIntoView();
cy.get('.justify-center > .btn').click();

// Check error message for required Phone Number
cy.get('.error-msg').should('have.text', 'Phone Number is required.');

// Enter a valid phone number
cy.get('.justify-center > .flex > .MuiBox-root > .input-field').type(phoneNumber);
cy.wait(10000);

// Select an option on the fourth screen
cy.get('.MuiDialogContent-root > .leaffilter-forms > .MuiContainer-root > .MuiPaper-root > .justify-center > :nth-child(4) > .MuiBox-root > :nth-child(2)')
  .click();

// Verify the progress bar color on the fourth screen
cy.get('.justify-center > .btn').scrollIntoView();
cy.get('.justify-center > div.mx-auto > .d-flex > :nth-child(7) > .progress-bar')
  .should('have.css', 'background-color', 'rgb(0, 133, 62)');

  
// Continue to the next step
cy.get('.justify-center > .btn').click();
cy.wait(3000);

// After submit 
cy.get('.MuiDialogContent-root > .leaffilter-forms > .MuiContainer-root > .MuiPaper-root > .flex > h3')
  .should('have.text', 'Your information has been received!');
cy.get('.flex > .btn').should('be.visible');

// Close pop-up
cy.get('.MuiButtonBase-root > :nth-child(1)').click();

// Scroll to the header logo and click
cy.get('.header-logo > .image').scrollIntoView().click();



  });
});
