import BasePage from "./BasePage";
import loginPage from "./LoginPage";

class RegisterPage extends BasePage {

    visitRegisterPage(){
        cy.visit('/#/register');
    }
    
    checkURL() {
        cy.url().should('contain', '/register');
    }
    visit() {
        cy.visit('/#/register')
    }

    getLoginLink() {
        return cy.get('a.primary-link[href="#/login"]')
    }

    getEmailField() {
        return cy.get('#emailControl');
    }

    getPasswordField() {
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    getToggleBar() {
        return cy.get('.mat-slide-toggle-bar').first();
    }

    getCheckedToggleBar() {
        return cy.get('[aria-checked="true"]');
    }

    getWarnIcon() {
        return cy.get('[role="img"][color="warn"]');
    }

    getInfoRow() {
        return cy.get('.info-row');
    }

    getQuestionDropdown() {
        return cy.get('.security-container')
            .find('mat-select')
            .first();
    }

    getQuestionType(number){
        return cy.get('div[role="listbox"] [role="option"]').eq(number)
    }

    getQuestionAnswerField() {
        return cy.get('input[placeholder="Answer to your security question"]');
    }

    getRegisterButton() {
        return cy.get('#registration-form button');
    }

    checkIfRegisterPageOpen() {
        this.checkURL();
        this.getLoginLink().should('be.visible');
    }

    fillInRegistrationForm(user) {
        this.getEmailField().type(user.email);
        this.getPasswordField().type(user.password);
        this.getRepeatPasswordField().type(user.password);
        this.getToggleBar().click();
        this.getCheckedToggleBar().should('be.visible');
        this.getInfoRow().should('be.visible').and('have.length', 5);

        this.getQuestionDropdown().click();
        this.getQuestionType(user.questionNumber).click();

        this.getQuestionAnswerField().type(user.answer);
    }

    submitregistrationForm() {
        this.getRegisterButton().should('not.have.attr', 'disabled');
        this.getRegisterButton().click();
    }

    registerNewUser(user) {
        cy.log('**Go to registration form');
        cy.visit('/#/register')
    
        cy.log('**Fill in registration form with valid data**');
        this.fillInRegistrationForm(user);
        this.submitregistrationForm();
    
        cy.log('**Check if successful toast is shown**');
        loginPage.getToastSuccessfulRegistration().should('be.visible');
    
        cy.log('**Check if login page is open**');
        loginPage.getLoginForm();
    }
    getErrorExistingEmail() {
        return cy.get('h1').next('div');
    }

    getErrorEmptyEmail() {
        return cy.get('#emailControl').parents('mat-form-field').find('.mat-form-field-subscript-wrapper')
    }

    getErrorEmptyPassword() {
        return cy.get('#passwordControl').parents('mat-form-field').find('.mat-form-field-subscript-wrapper')
    }

    getErrorEmptyPasswordRepeat() {
        return cy.get('#repeatPasswordControl').parents('mat-form-field').find('.mat-form-field-subscript-wrapper')
    }

    getErrorEmptySecurityQuestion() {
        return this.getQuestionDropdown().parents('mat-form-field').find('.mat-form-field-subscript-wrapper')
    }

    getErrorEmptyAnswer() {
        return this.getQuestionAnswerField().parents('mat-form-field').find('.mat-form-field-subscript-wrapper')
    }

}
export default new RegisterPage();