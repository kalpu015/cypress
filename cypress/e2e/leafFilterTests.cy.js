
import homepage from "../Pages/homepage";
import zipCheckerFormPage from "../Pages/zipCheckerFormPage";


describe('LeafFilter Zip Checker Form Tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

let testData;

  beforeEach(() => {
    // Load test data from the fixture
    cy.fixture('test-data.json').as('testData');
      //console.log('Test Data:', validZipCode);

    homepage.visit();

  })

  it('Navigates to the page and checks Zip Checker form', function() {
    // Invalid ZIpcode 

    const invalidZipCode = this.testData.zipCodeData.invalidZipCode;
    const validZipCode = this.testData.zipCodeData.validZipCode;
    const firstName = this.testData.userData.user1.firstName;
    const lastName = this.testData.userData.user1.lastName;
    const email = this.testData.userData.user1.email;
    const validPhoneNumber = this.testData.phoneNumber.validPhoneNumber;
  
    zipCheckerFormPage.fillZipCodeinvalid(invalidZipCode);
    cy.wait(2000);
    zipCheckerFormPage.clickGetEstimate();
    cy.get('#field_2_68 > h3').should('not.be.visible');
    cy.log('Element not found, Test pass for invalid Zipcode.');
    cy.screenshot('Error message capture')

    zipCheckerFormPage.fillZipCode(validZipCode);
    cy.wait(2000);
    zipCheckerFormPage.clickGetEstimate();

    cy.get('#field_2_68 > h3').should('be.visible');
    cy.get('#gf_progressbar_wrapper_2 > div > div')
    .invoke('text')
    .should('eq', '25%');
    cy.screenshot('valid zipcode screen')

    cy.get('#estimateModal > div > div').then(($element) => {
      // Click on the element using native JavaScript click method
      $element[0].click();
    });

    cy.wait(2000)

    cy.get('#label_2_35_0').should('be.visible')
    
    cy.get('#label_2_35_0').click();

    cy.get('#gform_next_button_2_38').click();

  cy.wait(5000);

  cy.screenshot('popup with 50%')

  cy.get('#gf_progressbar_wrapper_2 > div > div:first')
  .invoke('text')
  .should('eq', '50%');

  cy.get('#label_2_63_2').click({ force: true });

  cy.wait(2000);

    cy.get('#gform_next_button_2_67:first')
  .should('be.visible')
  .click();

  cy.wait(3000);
  //Verify error message appears for mandatory fields

  cy.get('#gf_progressbar_wrapper_2 > div > div:first')
  .invoke('text')
  .should('eq', '75%');

  cy.screenshot('popup with 75%')

  cy.wait(2000);

  cy.get('#gform_next_button_2_59:first').click();

  cy.wait(2000);
  cy.screenshot('Error message under FN,LN and email')

  cy.get('#validation_message_2_28:first').should('be.visible');
  cy.get('#validation_message_2_29:first').should('be.visible');
  cy.get('#validation_message_2_31:first').should('be.visible');

    // Use cy.get() with :first selector to click on the first element
    cy.get('#input_2_28:first').should('be.visible')
    cy.get('#input_2_28:first').type(firstName);

    cy.get('#input_2_29:first').should('be.visible')
    cy.get('#input_2_29:first').type(lastName);

    cy.get('#input_2_31:first').should('be.visible')
    cy.get('#input_2_31:first').type(email);

    cy.wait(3000);

    cy.get('#gform_next_button_2_59:first').click();

    cy.wait(3000);

    //veriify phone error message 

    cy.get('#gf_progressbar_wrapper_2 > div > div:first')
  .invoke('text')
  .should('eq', '100%');

  cy.screenshot('popup with 100%')

  cy.wait(2000);

    cy.get('#gform_submit_button_2').click();
    cy.get('#input_2_30').eq(0).scrollIntoView();
    cy.get('#validation_message_2_30').eq(0).should('be.visible');

    cy.screenshot('Error message under Phone field')

    cy.get('#input_2_30').eq(0).type(validPhoneNumber);

    cy.get('#label_2_71_0').should('exist').should('be.visible')
    cy.get('#gform_submit_button_2').scrollIntoView();
    cy.get('#gform_submit_button_2').should('be.visible');
    cy.get('#gform_submit_button_2').click();
    cy.wait(2000);

    cy.get('.customer-ty > h4:first')
  .invoke('text')
  .should('eq', 'Thanks John,');

  cy.screenshot('Thankyou Screen')

  cy.get('.button-wrapper > .tel-link').should('be.visible');
  cy.get('#estimateModal > div > div > button').click();

  cy.wait(1000);
  cy.get('.header-logo > .image').click();

  cy.log('test Completed.Endingcypress test run');
    
  })

  })




