import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import registerPage from '../support/pages/RegisterPage';
import loginPage from '../support/pages/LoginPage';
import sideNav from '../support/pages/SideNav';
import mainPage from '../support/pages/MainPage';
import homePage from '../support/pages/HomePage';
import feedback from '../support/pages/Feedback';
import {closeBanner } from '../support/helper';


user.email = faker.internet.email();
user.password = faker.internet.password({ length: 10 });
user.answer = faker.person.firstName();
user.questionNumber = faker.number.int({ min: 0, max: 13 });
const text = faker.lorem.words(7);

before('Register user', () => {
    registerPage.visitRegisterPage();
    if (homePage.getWelcomeBanner()) {
        closeBanner()
    }
    registerPage.registerNewUser(user);
    loginPage.loginViaUI(user);
})

it('Fill feedback form', () => {

    cy.log('**Go to the side menu and click the feedback item**')
    
    mainPage.getSideNav().click().then(() => {

        sideNav.getFeedbackMenuItem().click().then(() => {
            feedback.getFeedbackHeading().should('be.visible')

            cy.log('**Fill feedback form**')

            feedback.fillInFeedbackForm(text)

            cy.log('**Submit form and check that api POST request is successful**')

            feedback.submitForm()
        })
    })
})

