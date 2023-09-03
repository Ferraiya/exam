import BasePage from "./BasePage";

class Basket extends BasePage {

    checkHeader(email) {
        return cy.get('h1').should('contain', 'Your Basket').find('small').should('contain', `(${email})`);
    }

    checkUrl() {
        cy.url().should('include', '/basket');
    }

    getTrashIcon(){
        return  cy.get('[data-icon="trash-alt"]');
    }

    getItemCell() {
        return cy.get('.cdk-cell[role="cell"]', { timeout: 20000 });
    }

    getNameCell(){
        return cy.get('mat-cell.mat-column-product', { timeout: 20000 });
    }
    getQuantityCell(){
        return cy.get('.mat-column-quantity');
    }
    getPlusIcon(){
        return cy.get('.mat-focus-indicator.mat-icon-button').eq(1);
    }
    getMinusIcon(){
        return cy.get('.mat-focus-indicator.mat-icon-button').eq(0);
    }

    getCheckoutButton() {
        return cy.get('button.checkout-button');
    }

    clickCheckoutButton() {
        this.getCheckoutButton().click();
    }

}

export default new Basket();