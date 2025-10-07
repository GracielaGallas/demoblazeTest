// cypress/support/appActions/productActions.js

function generateCreditCardNumber() {
  let cc = '4';
  for (let i = 0; i < 15; i++) {
    cc += Math.floor(Math.random() * 10).toString();
  }
  return cc;
}

export const productActions = {

  buyLaptop(laptopName) {
    cy.get('[onclick="byCat(\'notebook\')"]').click();
    cy.get('.card-title').should('exist');
    cy.contains('.card-title a', laptopName).click();
    cy.get('a[onclick^="addToCart"]')
      .should('be.visible')
      .should('not.be.disabled')
      .click();
    cy.wait(800)
    // cy.on('window:alert', (str) => {
    //     expect(str).to.include('Product added.');
    // });
    cy.get('.navbar-brand').click();
    cy.get('#cartur').click();
    cy.wait(400)

  },

  // TO DO
  buyMonitor(monitorName) {
  },

  // TO DO
  buyPhone(phoneName) {
  },

  fillOrderForm() {
    cy.fixture('orderData').then(orderData => {
      cy.contains('button', 'Place Order').click();
      cy.wait(600)
      cy.get('#name')
        .should('be.visible')
        .should('not.be.disabled')
        .wait(400)
        .focus()
        .clear()
        .type(orderData.name, { delay: 100 });
      cy.get('#country')
        .clear()
        .type(orderData.country);
      cy.get('#city')
        .clear()
        .type(orderData.city);
      cy.get('#card')
        .clear()
        .type(generateCreditCardNumber());
      cy.get('#month')
        .clear()
        .type(orderData.month);
      cy.get('#year')
        .clear()
        .type(orderData.year);
    });
  },

  finishAndConfirmOrder() {
    cy.contains('button', 'Purchase').click()
    cy.contains('Thank you for your purchase', { timeout: 5000 }).should('be.visible');
    cy.wait(600)
    cy.contains('button', 'OK').should('be.visible').and('not.be.disabled').click();
  }
};
