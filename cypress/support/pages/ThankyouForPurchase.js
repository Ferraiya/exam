import BasePage from "./BasePage";

class ThankPage extends BasePage {
    header() {
        return cy.get('h1')
    }
}

export default new ThankPage();