import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import loginPage from '../support/pages/LoginPage';
import paymentData from '../fixtures/paymentData.json';
import location from '../fixtures/location.json';
import registerPage from '../support/pages/RegisterPage';
import mainPage from '../support/pages/MainPage';
import homePage from '../support/pages/HomePage';
import basket from '../support/pages/Basket';
import checkout from '../support/pages/Checkout';
import deliveryMethod from '../support/pages/DeliveryMethod';
import payment from '../support/pages/Payment';
import review from '../support/pages/Review';
import thankPage from '../support/pages/ThankyouForPurchase';
import { closeBanner, findProductByName } from '../support/helper';

user.email = faker.internet.email();
user.name = faker.person.firstName();
user.password = faker.internet.password({ length: 10 });
user.answer = faker.person.firstName();
user.questionNumber = faker.number.int({ min: 0, max: 13 });

location.country = faker.location.country();
location.phone = faker.number.int({ min: 11111111, max: 9999999999 });
location.zip = faker.number.int({ min: 11111, max: 99999 });
location.address = faker.location.streetAddress();
location.city = faker.location.city();

paymentData.card = faker.finance.creditCardNumber('4242############');
paymentData.cardMonth = faker.number.int({ min: 1, max: 12 }).toString();
paymentData.cardYear = faker.number.int({ min: 2080, max: 2099 }).toString();

before('Register user', () => {
    registerPage.visitRegisterPage();
    if (homePage.getWelcomeBanner()) {
        closeBanner();
    }
    registerPage.registerNewUser(user);
    loginPage.loginViaUI(user);
    mainPage.getAddToBasketButton({ timeout: 10000 }).should('be.visible');
})

it('Place an order', () => {

    cy.log('**Add item to basket**');

    mainPage.getNumberItemsInBasket().should('equal', '0');
    mainPage.getItemWithoutRibbon().should('be.visible');
    mainPage.addItemWithoutRibbonToBasket();

    cy.log('**Go to basket**');

    mainPage.getShoppingBasketButton({ timeout: 10000 }).contains('1').click();

    basket.checkHeader(user.email);
    basket.checkUrl();

    cy.log('**Check if the item name is in basket**');

    basket.getItemCell().should('exist');

    cy.log('**Go to checkout page**');

    basket.clickCheckoutButton();
    checkout.checkUrl();

    cy.log('**Create new shipping address**');

    cy.intercept('/api/Addresss').as('newAddress');
    checkout.clickCreateAddressButton();
    checkout.createNewAddress(user, location);
    cy.wait('@newAddress');

    cy.log('**Select address and proceed to delivery**');

    checkout.selectAddress();
    checkout.clickProceedButton();

    cy.log('**Select delivery method and proceed to payment page**');

    deliveryMethod.checkUrl();
    deliveryMethod.selectRadioButton();
    deliveryMethod.clickProceedButton();

    payment.checkUrl();

    cy.log('**Add a new payment card, select it and confirm payment**');

    payment.addNewCard(user, paymentData);
    payment.clickRadioButton();
    payment.clickProceedButton();

    cy.log('**Confirm order**');

    review.checkUrl();
    review.clickCheckoutButton().waitUntil(() => {

        return thankPage.header().should('contain', 'Thank you for your purchase!');
    })
})

it.only('Find item by search', () => {

    let productName = 'Eggfruit Juice';

    mainPage.getNumberItemsInBasket().should('equal', "0");

    cy.log('Find product by name');

    mainPage.getSearchIcon( {timeout:20000} ).click();
    findProductByName(productName, { timeout: 10000 });

    cy.log('**Add item to basket**');

    mainPage.getButtonBuyFoundItem().click();

    cy.log('**Check that number of items in basket changed**');

    mainPage.getNumberItemsInBasket().should('equal', "1");

    cy.log('**Go to basket**');

    mainPage.getBasketMenuButton().click().then(() => {
        basket.checkUrl();
        basket.checkHeader(user.email).then(() => {

            cy.log('**check if trash icon is shown**');

            basket.getTrashIcon().should('be.visible');

            cy.log('**Check if correct product name is shown**');

            basket.getNameCell().should('contain', productName);

            cy.log('**Change number of products in basket**');

            basket.getQuantityCell().should('contain', '1');

            basket.getPlusIcon().click().then(() => {
                basket.getQuantityCell().should('contain', '2');
                basket.getMinusIcon().click().then(() => {
                    basket.getQuantityCell().should('contain', '1');
                    basket.getPlusIcon().click().then(() => {
                        basket.getQuantityCell().should('contain', '2')
                })
            })
        })
    })
})

cy.log('**Go to checkout page**');

basket.clickCheckoutButton();
checkout.checkUrl();

cy.log('**Create new shipping address**');

cy.intercept('/api/Addresss').as('newAddress');
checkout.clickCreateAddressButton();
checkout.createNewAddress(user, location);
cy.wait('@newAddress');

cy.log('**Select address and proceed to delivery**');

checkout.selectAddress();
checkout.clickProceedButton();

cy.log('**Select delivery method and proceed to payment page**');

deliveryMethod.checkUrl();
deliveryMethod.selectRadioButton();
deliveryMethod.clickProceedButton();

payment.checkUrl();

cy.log('**Add a new payment card, select it and confirm payment**');

payment.addNewCard(user, paymentData);
payment.clickRadioButton();
payment.clickProceedButton();

cy.log('Check if correct product name and quantity is in summary');
cy.get('.cdk-column-product.mat-column-product').should('contain', productName);
cy.get('.cdk-column-quantity.mat-column-quantity').should('contain', '2');

cy.log('**Confirm order**');

review.checkUrl();
review.clickCheckoutButton().waitUntil(() => {

    return thankPage.header().should('contain', 'Thank you for your purchase!');
})
})

