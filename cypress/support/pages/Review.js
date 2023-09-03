import BasePage from "./BasePage";

class Review extends BasePage {
    checkUrl() {
        return cy.url().should('include', '#/order-summary')
    }

    getHeader(){
        return cy.get('.order-summary');
    }

    clickCheckoutButton() {
        return cy.get('#checkoutButton').click();
    }
}

export default new Review();