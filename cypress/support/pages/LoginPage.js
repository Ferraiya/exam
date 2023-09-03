import BasePage from "./BasePage";

class LoginPage extends BasePage {

    visitLoginPage(){
        cy.visit('/#/login');
    }
    
    getCreateCustomerLink() {
        return cy.get('#newCustomerLink');
    }

    getRememberMeBox(){
        return cy.get('#rememberMe [type="checkbox"]');
    }

    getLoginForm() {
        return cy.get('#login-form');
    }

    getToastSuccessfulRegistration() {
        return (cy.get('.mat-snack-bar-container'));
    }

    getEmailField() {
        return cy.get('input#email');
    }

    getPasswordField() {
        return cy.get('input#password');
    }

    getLoginButton() {
        return cy.get('.form-container button').eq(1);
    }

    getForgotPasswordLink(){
        return cy.get('.forgot-pw');
    }

    fillLoginForm(user) {
        this.getEmailField().type(user.email);
        this.getPasswordField().type(user.password);
    }

    getErrorEmptyEmail() {
        return cy.get('#email').parents('mat-form-field').find('.mat-form-field-subscript-wrapper');
    }

    getErrorEmptyPassword() {
        return cy.get('#password').parents('mat-form-field').find('.mat-form-field-subscript-wrapper');
    }

    fields(){
       return cy.get('input.mat-input-element[aria-required="true"]');
    }

     loginViaUI(user) {
        cy.url().should('contain', '/login');
        this.fillLoginForm(user);
        this.getLoginButton().click();
        cy.url().should('contain', '/search');
    }
}

export default new LoginPage;