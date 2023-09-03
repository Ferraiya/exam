export function closeBanner() {
  cy.get('app-welcome-banner button.close-dialog').click();
}

export function findProductByName(itemName) {
  return cy.get('input').type(itemName + '{enter}').then(() => {

    cy.get('div.item-name').first().then(($el) => {
      expect($el).to.contain(itemName);
    })
  })
}


