import BasePage from "./BasePage";

class HomePage extends BasePage {

    visit() {
        cy.visit('/');
    }
    getWelcomeBanner(){
        return cy.get('app-welcome-banner')
    }
}

export default new HomePage();