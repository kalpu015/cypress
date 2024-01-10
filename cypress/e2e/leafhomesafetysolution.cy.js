import { urls } from '../Pages/homePage';

describe('Zip Checker Modal Test', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  let testData;

  beforeEach(() => {
    // Navigate to the website
    cy.fixture('test-data.json').as('testData');
    cy.visit(urls.HomeSafe);

    // Scroll down to the "Life on Your Terms" section
    cy.get(':nth-child(2) > .content-card > .card > .card-body > .card-title').scrollIntoView();
    cy.get(':nth-child(2) > .content-card > .card > .card-body > .card-title').click();

    // Click the "Get estimate" button on the header
    cy.get("div[data-title='Get Estimate'] div[class='w-screen h-screen flex flex-col items-center justify-start'] div button[class='btn btn-primary']").contains('Get Estimate').click();
  });

  it('should validate zip code input', function () {
    const invalidZipCode = this.testData.zipCodeData.invalidZipCode;
    const validZipCode = this.testData.zipCodeData.validZipCode;
    const maxZipcode = this.testData.zipCodeData.invalidmax;
    const invalidName = this.testData.userData.invalid.NameInvalid;
    const email = this.testData.userData.valid.email;
    const validName = this.testData.userData.valid.Name;
    const phoneNumber = this.testData.phoneNumber.validPhoneNumber;
    const invalidPhoneNumber = this.testData.phoneNumber.invalidPhoneNumber;

    // Verify the zip code with 5 digits
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(2) > input').type(invalidZipCode);
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(4) > div > div > label:nth-child(1) > svg').click();
    cy.get('.error-msg').should('have.text', 'ZIP Code must be a 5-digit number.');
    cy.screenshot('Zipcode/invalidzip');
    
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(2) > input').clear().type(maxZipcode);
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(4) > div > div > label:nth-child(1) > svg').click();
    cy.get('.error-msg').should('have.text', 'ZIP Code must be a 5-digit number.');
    cy.screenshot('Zipcode/maxzip');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(2) > input').clear().type(validZipCode);
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(4) > div > div > label:nth-child(1) > svg').click();

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(6) > div > div > label:nth-child(1) > svg').click();
    cy.screenshot('Zipcode/validzip');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(7) > button').click();

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div.mx-auto > div > div:nth-child(1) > div')
      .should('have.css', 'background-color', 'rgb(61, 116, 145)');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div.step2 > h3')
      .should('have.text', 'Does anyone in your household qualify for an extra 10% senior or military discount?');

    // Select senior
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(3) > div > label:nth-child(1) > svg').click();
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div.mx-auto > div > div:nth-child(3) > div')
      .should('have.css', 'background-color', 'rgb(61, 116, 145)');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(4) > button').click();

    cy.get(':nth-child(6) > div > ul > li:nth-child(1)').should('have.text', '10% OFF Promo');
    cy.get(':nth-child(6) > div > ul > li:nth-child(2)').should('have.text', '+10% Senior/Military Discount');
    cy.screenshot('Type/Senior-offer');

    // Close and select neither option
    cy.get('.MuiButtonBase-root > :nth-child(1)').click();
    cy.get(':nth-child(2) > .content-card > .card > .card-body > .card-title').scrollIntoView();
    cy.get(':nth-child(2) > .content-card > .card > .card-body > .card-title').click();
    cy.get("div[data-title='Get Estimate'] div[class='w-screen h-screen flex flex-col items-center justify-start'] div button[class='btn btn-primary']").contains('Get Estimate').click();
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(2) > input').type(validZipCode);
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(7) > button').click();
    cy.get('form > div:nth-child(3) > div > label:nth-child(3) > svg').click();
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(4) > button').click();
    cy.get(':nth-child(6) > div > ul > li:nth-child(1)').should('have.text', '10% OFF Promo');
    cy.get(':nth-child(6) > div > ul > li:nth-child(2)').should('not.exist');
    cy.screenshot('Type/neither-offer');

    // Third screen
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > h3')
      .should('have.text', 'Who are we personalizing this estimate for ?');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div.mx-auto > div > div:nth-child(5) > div')
      .should('have.css', 'background-color', 'rgb(61, 116, 145)');

    cy.wait(1000);

    cy.get('.MuiDialogContent-root > .leaffilter-forms > .forms-content > .MuiContainer-root > .MuiPaper-root > .flex > :nth-child(7) > .btn').click();

    // Validate error message
    cy.get('.MuiBox-root.css-8ts2me > p').should('have.text', 'Full Name is required.');
    cy.get(':nth-child(4) > p').should('have.text', 'Email Address is required.');
    cy.screenshot('Name/EmailName-Error-message');

    // Enter Data
    cy.get('.MuiBox-root.css-8ts2me > input').type(invalidName);
    cy.get('.MuiBox-root.css-8ts2me > p').should('have.text', 'Full Name must include both First Name and Last Name.');
    cy.get('.MuiBox-root.css-8ts2me > input').clear().type(validName);
    cy.get(':nth-child(4) > .input-field').type(email);
    cy.screenshot('Name/EmailName-valid');

    cy.get('.MuiDialogContent-root > .leaffilter-forms > .forms-content > .MuiContainer-root > .MuiPaper-root > .flex > :nth-child(7) > .btn').click();

    // Screen 4
    cy.get('.MuiDialogContent-root > .leaffilter-forms > .forms-content > .MuiContainer-root > .MuiPaper-root > form > h3')
      .should('have.text', 'Just a few more questions about your project.');
    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(2) > div > label:nth-child(1) > svg').click();
    cy.get(' fieldset > label:nth-child(2) > svg').click();

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div.mx-auto > div > div:nth-child(7) > div')
      .should('have.css', 'background-color', 'rgb(61, 116, 145)');
    cy.screenshot('Screen4/Role');

    cy.get(' form > div:nth-child(6) > button').click();

    // Screen 5
    cy.get(':nth-child(5) > .btn').click();
    cy.get('.error-msg').should('have.text', 'Phone Number is required.');
    cy.screenshot('Phone/Mandatory-Error');

    cy.get('.justify-center > .flex > .MuiBox-root > .input-field').type(invalidPhoneNumber);

    cy.get('.error-msg').should('have.text', 'Phone Number is not valid.');
    cy.screenshot('Phone/Invalid-Error');

    cy.get('.justify-center > .flex > .MuiBox-root > .input-field').type(phoneNumber);

    cy.get(':nth-child(4) > .MuiBox-root > :nth-child(1)').click();

    cy.get('.MuiDialogContent-root > .leaffilter-forms > .forms-content > .MuiContainer-root > .MuiPaper-root > .justify-center > div.mx-auto > .d-flex > :nth-child(9) > .progress-bar')
      .should('have.css', 'background-color', 'rgb(61, 116, 145)');
    cy.screenshot('Phone/valid');

    // cy.wait(12000);

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > form > div:nth-child(5) > button').click();

    cy.wait(10000);

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > h3').should('have.text', 'Your information has been received!');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > p:nth-child(8) > span')
      .should('have.text', '1-833-376-8129');

    cy.get('.MuiDialogContent-root.p-0.css-1ty026z > div > div > div > div > button')
      .should('be.visible').and('be.enabled');
    cy.screenshot('Received info');

    cy.get('.MuiButtonBase-root > :nth-child(1)').click();
  });
});
