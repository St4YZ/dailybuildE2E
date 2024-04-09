import { test } from '@playwright/test'
import { LoginPage } from '../Page-Objects/LoginPage';

test.beforeEach(async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    await loginPage.fillEmail(loginPage.defaultEmail);
    await loginPage.clickNextButton();
    await loginPage.clickUserProfile();
})

test('Verify that user is able to open the Log In page', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.waitForSignInURL();
    await loginPage.assertCurrentUrlEqualsExpectedSignInURL();
})


test('Verify that the all fields are displayed on the "Log in" page.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.assertEmailFieldIsVisible();
    await loginPage.assertPasswordFieldIsVisible();
    await loginPage.assertForgotPasswordButtonIsVisible();
    await loginPage.assertLogInButtonIsVisible();
    await loginPage.assertSignUpButtonIsVisible();
    await loginPage.assertSignUpWithGoogleButtonIsVisible();
})

test('Verify that the "Login" button is not clickable.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.assertLogInButtonIsDisabled();
})

test('Verify that the "Log In" button cannot be clicked if only the "Email" field is filled.', async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.clearEmailField();
    await loginPage.fillEmailField(loginPage.defaultEmail);
    await loginPage.assertLogInButtonIsDisabled();
})

test('Verify that the "Log In" button cannot be clicked if only the "Password" field is filled.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.fillPasswordField(loginPage.defaultPassword); 
    await loginPage.assertLogInButtonIsDisabled();
})

test('Verify that the system will not skip the user further if the "Password" field is empty.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clickOnPasswordField();
    await loginPage.clickOnLogInButton();
    await loginPage.assertPasswordFieldHasErrorMessageIsRequired();
})


test('Verify that the email must contain two special characters: ( @ and . )', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.fillEmailField(loginPage.defaultEmail + "&&");
    await loginPage.clickOnLogInButton();
    await loginPage.assertEmailShouldContainSpecialCharacters();
})

test('Verify the "Email Address" field displays an example email.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.assertEmailsPlaceholderValue();
    await loginPage.fillEmailField('1');
    await loginPage.assertEmailsAriaAttributeValue();
})

test('Verify that the password must contain more than 6 characters.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillPasswordField('1');
    await loginPage.clickOnLogInButton();
    await loginPage.assertPasswordErrorMessageContainsNotLessThanSixSymbols();
})

test('Verify that the password entered by the user is hidden.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillPasswordField(loginPage.defaultPassword);
    await loginPage.assertPasswordIsHidden();
})


test('Verify that the user can view their password.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillPasswordField(loginPage.defaultPassword);
    await loginPage.clickOnViewPasswordButton();
    await loginPage.getPasswordFieldValue();
    await loginPage.assertPasswordValueAndAttribute();
})

test('Verify that the user can log in to their account.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.fillEmailField(loginPage.defaultEmail);
    await loginPage.fillPasswordField(loginPage.defaultPassword);
    await loginPage.clickOnLogInButton();
    await loginPage.waitForMainPageURL();
    await loginPage.assertCurrentUrlEqualsExpectedMainURL();
})


test('Verify that the validation works if an incorrect email address is entered.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.fillEmailField(loginPage.defaultEmail +'s');
    await loginPage.fillPasswordField(loginPage.defaultPassword);
    await loginPage.clickOnLogInButton();
    await loginPage.assertValidationErrorMessageIsUnauthorized();
})

test('Verify that the validation works if an incorrect Password is entered.', async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.clearEmailField();
    await loginPage.fillEmailField(loginPage.defaultEmail);
    await loginPage.fillPasswordField(loginPage.defaultPassword + '123');
    await loginPage.clickOnLogInButton();
    await loginPage.assertValidationErrorMessageIsUnauthorized();
})

test('Verify that the "Register" button is working.', async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickOnSignUpTextButton();
    await loginPage.waitForSignUpURL();
    await loginPage.assertCurrentUrlEqualsExpectedSignUpURL();
})