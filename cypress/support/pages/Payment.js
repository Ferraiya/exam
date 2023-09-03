import BasePage from "./BasePage";

class Payment extends BasePage {
    checkUrl() {
        cy.url().should('include', '/#/payment/shop')
    }

    getExpandCardButton() {
        return cy.get('.mat-expansion-panel-header').first()
    }

    expandCard() {
        this.getExpandCardButton().click();
    }

    getNameField() {
        return cy.get('input#mat-input-14');
    }

    getCardField() {
        return cy.get('input#mat-input-15');
    }

    getInputMonth() {
        return cy.get('select#mat-input-16');
    }

    getInputYear() {
        return cy.get('select#mat-input-17');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getRadioButton() {
        return cy.get('.mat-radio-button');
    }

    clickRadioButton(){
        this.getRadioButton().click();
    }

    getProceedButton() {
        return cy.get('[aria-label="Proceed to review"]');
    }

    clickProceedButton(){
        return this.getProceedButton().click();
    }

    addNewCard(user, paymentData){
        this.expandCard();
        this.getNameField().type(user.name);
        this.getCardField().type(paymentData.card);
        this.getInputMonth().select(paymentData.cardMonth);
        this.getInputYear().select(paymentData.cardYear);
        this.getSubmitButton().click();
    }
}

export default new Payment();