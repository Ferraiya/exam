import * as math from 'mathjs';

class Feedback {

    getFeedbackHeading() {
        return cy.contains('h1', 'Customer Feedback');
    }

    getCommentField() {
        return cy.get('#comment');
    }

    getRating() {
        return cy.get('#rating');
    }

    getCaptcha() {
        return cy.contains('What is').next('code').invoke('text');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getToastMessage() {
        return cy.get('snack-bar-container');
    }

    getCaptchaAnswerField() {
        cy.get('#captchaControl')
    }

    submitForm() {
        cy.intercept('/api/Feedbacks/').as('feedback')

        cy.log('**Click Submit button and check the toast message and api result**')

        this.getSubmitButton().click().then(() => {
            this.getToastMessage().should('contain', 'Thank you for your feedback.')
        })
        cy.get('@feedback').then((result) => {
            expect(result.response.statusCode).to.equal(201)
        })
    }

    fillInFeedbackForm(text) {
        this.getCommentField().focus().type(text)
        this.getRating().click()
        this.getCaptcha().then((text) => {
            const mathExpression = text;
            const result = math.evaluate(mathExpression);
            cy.get('#captchaControl').focus().type(result);
        })
    }

}

export default new Feedback();


