export default class BasePage {

    getCloseBannerButton() {
        return cy.get('app-welcome-banner button.close-dialog');
    }

    getSearchIcon(){
        return cy.contains('search');
    }

    getAccountButton() {
        return cy.get('#navbarAccount');
    }

    getLoginButton() {
        return cy.get('#navbarLoginButton');
    }

    getBasketMenuButton(){
        return  cy.contains('Your Basket');
    }

    getNumberItemsInBasket(){
        return cy.get('span.fa-layers-counter.fa-layers-top-right.warn-notification').invoke('text');
    }
}