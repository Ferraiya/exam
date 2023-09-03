import BasePage from "./BasePage";

class DeliveryMethod extends BasePage {
checkUrl(){
    return cy.url().should('include', '/#/delivery-method')
}
selectRadioButton(){
return cy.get('mat-table mat-radio-button', { timeout: 10000 }).first().click()
}

clickProceedButton(){
    return cy.get('[aria-label="Proceed to delivery method selection"]').click()
}
}

export default new DeliveryMethod();