describe('Carrer Sales form', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  
    it('passes', () => {

    const verifytextInHome = 'In-Home Sales Reps Wanted';
    const verifyTextsubmit = 'Submit your information and we will reach out to you.' ;
    const Thank_you = 'Thank you for your submission. Someone will be in touch with you shortly.';  

      cy.visit('https://www.leaffilter.com/company/careers/sales/');
      
      cy.xpath('(//article[@id="post-17688"]//span)[1]')
        .should('have.text', verifytextInHome);

     cy.xpath('(//article[@id="post-17688"]//span)[1]').click(); 
     
     cy.xpath('//article[@id="post-17688"]//h3')
        .should('have.text',verifyTextsubmit);
     cy.wait(10000);   

     // Failed case 
     cy.xpath('//button[@type="submit"]').scrollIntoView();
     cy.xpath('//button[@type="submit"]')
     .should('have.text','Submit')
     .click();

     cy.xpath('//article[@id="post-17688"]//h3').scrollIntoView();

   cy.xpath('//article[@id="post-17688"]//form/div[1]/p')
     .should('have.text','Full Name is required.');

   cy.xpath('//article[@id="post-17688"]//form/div[2]/p')
     .should('have.text','Phone Number is required.');

   cy.xpath('//article[@id="post-17688"]//form/div[3]/p')
     .should('have.text','Email Address is required.');

   cy.xpath('//article[@id="post-17688"]//form/div[4]/p')
     .should('have.text','Zip Code is required.');

 cy.screenshot('Error screen');  
 
 // Success form submission 
 cy.xpath('//input[@name="fullName"]').type('First Last');

 cy.xpath('//input[@name="phoneNumber"]').type('1110987865');

 cy.xpath('//input[@name="emailAddress"]').type('test@test.com');

 cy.xpath('//input[@name="zipCode"]').type('20005');

 cy.xpath('//select[@id="source"]').select('Craigslist');

 cy.screenshot('Before submit')  

 cy.xpath('//button[@type="submit"]')
        .should('have.text','Submit')
        .click();  
  
 cy.xpath('//button[@type="submit"]')
        .should('have.text','Submitting');

 cy.xpath('//*[@id="post-17688"]//div/div/div/div/div/div/div[2]')
        .scrollIntoView();       

cy.xpath('//*[@id="post-17688"]//div/div/div/div/div/div/div[2]')
        .contains(Thank_you);

cy.screenshot('Thankyou Screen')     

    });
});