import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import registerPage from '../support/pages/RegisterPage';
import loginPage from '../support/pages/LoginPage';
import mainPage from '../support/pages/MainPage';
import { closeBanner } from '../support/helper';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 10 });
user.answer = faker.person.firstName();
user.questionNumber = faker.number.int({ min: 0, max: 13})

beforeEach('Visit homepage', () => {
  homePage.visit();
  homePage.getCloseBannerButton().click();

  cy.log('**Go to Login page**');
  homePage.getAccountButton().click();
  homePage.getLoginButton().click();
})

it('Registration', () => {
  registerPage.registerNewUser(user);
})

it('First login', () => {
  cy.url().should('contain', '/login');
  loginPage.loginViaUI(user)
  
  cy.log('**User should be logged in**');
  mainPage.getShoppingBasketButton();
})

it('Warning should appear if register with existing email', () => {
  user.email = faker.internet.email();

  registerPage.registerNewUser(user);
  cy.log('**Fill in registration form with valid data**');
  registerPage.visit()
  registerPage.fillInRegistrationForm(user);
  registerPage.submitregistrationForm();

  cy.log('**Check if warning is shown');
  registerPage.getErrorExistingEmail().should('contain', 'Email must be unique').and ('have.class', 'error');
})

it ('Warning should appear if register with missing fields', () => {

  cy.log('**Go to registration form')
  loginPage.getCreateCustomerLink().click();
  registerPage.checkIfRegisterPageOpen();

  cy.log('**Check if correct warnings are shown when leaving fields empty**')
  registerPage.getEmailField().focus().blur();
  registerPage.getErrorEmptyEmail().should('contain', 'Please provide an email address.');

  registerPage.getPasswordField().focus().blur();
  registerPage.getErrorEmptyPassword().should('contain', 'Please provide a password.');

  registerPage.getRepeatPasswordField().focus().blur();
  registerPage.getErrorEmptyPasswordRepeat().should('contain', 'Please repeat your password.');

  registerPage.getQuestionAnswerField().focus().blur();
  registerPage.getErrorEmptyAnswer().should('contain', 'Please provide an answer to your security question.');
  
  registerPage.getQuestionDropdown().focus().blur();
  registerPage.getErrorEmptySecurityQuestion().should('contain', 'Please select a security question.');  
})