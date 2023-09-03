import BasePage from "./BasePage";

class Checkout extends BasePage {

    checkUrl(){

    }

    getCreateAddressButton() {
        return cy.get('[routerlink="/address/create"]');
    }

    clickCreateAddressButton() {
        return this.getCreateAddressButton().click();
    }

    getCountryField() {
        return cy.get('[data-placeholder="Please provide a country."]');
    }

    getNameField() {
        return cy.get('[placeholder="Please provide a name."]');
    }

    getMobileNumberField() {
        return cy.get('[placeholder="Please provide a mobile number."]');
    }

    getPhoneField() {
        return cy.get('[placeholder="Please provide a mobile number."]');
    }

    getZIPcodeField() {
        return cy.get('[placeholder="Please provide a ZIP code."]');
    }

    getAddressField() {
        return cy.get('[placeholder="Please provide an address."]');
    }

    getCityField() {
        return cy.get('[placeholder="Please provide a city."]');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }
    getRadioButton() {
        return cy.get('mat-radio-button');
    }
    selectAddressRadio() {
        return this.getRadioButton();
    }
    getProceedButton() {
        return cy.get('[aria-label="Proceed to payment selection"]');
    }
    createNewAddress(user,location) {
        this.getCountryField().click().type(location.country);
        this.getNameField().type(user.name);
        this.getPhoneField().type(location.phone);
        this.getZIPcodeField().type(location.zip);
        this.getAddressField().type(location.address);
        this.getCityField().type(location.city);
        this.getSubmitButton().click();
    }

    checkAddressUrl() {
        return cy.url().should('include', '/address/select');
    }

    selectAddress() {
        this.selectAddressRadio().click();
    }

    clickProceedButton() {
        this.getProceedButton().click();
    }
}


export default new Checkout();