import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import registerPage from '../support/pages/RegisterPage';
import loginPage from '../support/pages/LoginPage';
import mainPage from '../support/pages/MainPage';
import homePage from '../support/pages/HomePage';
import { loginViaUI, closeBanner } from '../support/helper';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 10 });
user.answer = faker.person.firstName();
user.questionNumber = faker.number.int({ min: 0, max: 13 })

before('Register user', () => {
    registerPage.visitRegisterPage();
    if (homePage.getWelcomeBanner()) {
        closeBanner()
    }
    registerPage.registerNewUser(user);
})

it('Log in with valid creds', () => {
    cy.log('**Try to log in with valid credentials**')
    loginPage.loginViaUI(user);
    mainPage.getAddToBasketButton().should('be.visible')
})

it('Correct warnings should be shown when email and password are not entered', () => {

    cy.log('**Go to Login page**');
    loginPage.visitLoginPage();

    cy.log('Check if Forgot password link and Remember me checkbox are present**')
    loginPage.getForgotPasswordLink().should('be.visible')
    loginPage.getRememberMeBox().should('be.visible')

    cy.log('**Check if warnings text is correct for empty fields**')

    loginPage.fields().each((field) => {
        cy.wrap(field).focus().blur();
    });

    loginPage.getLoginButton().should('have.class', 'mat-button-disabled');
    loginPage.getErrorEmptyEmail().should('contain', 'Please provide an email address.');
    loginPage.getErrorEmptyPassword().should('contain', 'Please provide a password.');
})