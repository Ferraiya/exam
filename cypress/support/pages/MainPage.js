import BasePage from "./BasePage";

class MainPage extends BasePage {

    getShoppingBasketButton() {
        return cy.get('button[routerlink="/basket"]')
    }
    getAddToBasketButton() {
        return cy.get('button[aria-label="Add to Basket"]')
    }

    getItemWithoutRibbon() {
        return cy.get('.mat-card.ribbon-card:not(:has(.ribbon-top-left)')
    }

    getItemName() {
       return this.getItemWithoutRibbon()
            .first()
            .find('.item-name');
    }

    getButtonBuyFoundItem(){
        return cy.get('div.item-name').first().parents('mat-card').find('button[aria-label="Add to Basket"]')
    }

    addItemWithoutRibbonToBasket() {
        return this.getItemWithoutRibbon().first().find('.btn-basket')
            .click()
    }

    getAddItemToCartButton() {
        return cy.get('button[aria-label="Show the shopping cart"]')
    }

    getSideNav(){
        return cy.get('button[aria-label="Open Sidenav"]')
    }
}

export default new MainPage();