import { test } from '@playwright/test'
import { SignUpPage } from '../Page-Objects/SignUpPage'



test.beforeEach(async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigateTo();
    await signUpPage.fillEmailBeforeEach(signUpPage.defaultEmail);
    await signUpPage.clickNextButton();
    await signUpPage.clickUserProfile();
    await signUpPage.clickOnSignUpText();
})



test('Verify that user is able to open the Register page', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.waitForSignUpURL();
    await signUpPage.assertCurrentUrlEqualsExpectedSignUpURL();
})

test('Verify that the all fields are displayed on the "Create Account" page.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.assertEmailFieldIsVisible();
    await signUpPage.assertPasswordFieldIsVisible();
    await signUpPage.assertRepeatPasswordFieldIsVisible();
    await signUpPage.assertSignUpButtonIsVisible();
    await signUpPage.assertSignUpWithGoogleButtonIsVisible();
    await signUpPage.assertCheckboxOfPrivacyPolicyIsVisible();
})

test('Verify that the "Register" button is clickable.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtPrivacyPolicyCheckbox();
    await signUpPage.assertSignUpButtonToBeEnabled();
})

test('Verify that the "Register" button cannot be clicked if only the "Email Address" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(2);
})


test('Verify that the "Register" button cannot be clicked if only the "Create Password" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(2);
})

test('Verify that the "Register" button cannot be clicked if only the "Repeat Password" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(3);
})

test('Verify that the "Register" button cannot be clicked if only the "Create Password" adn "Repeat Password" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(1);
})

test('Verify that the "Register" button cannot be clicked if only the "Email Address" and "Repeat Password" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(2);
})

test('Verify that the "Register" button cannot be clicked if only the "Email Address" and "Create Password" field is filled.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertNumberOfValidationErrorMessages(1);
})


test('Verify that the email must contain two special characters: ( @ and . )', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail + '*');
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertEmailFieldShouldContainCorrectEmail();
})

test('Verify the "Email Address" field displays an example email.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.assertPlaceholderValueContainsExampleEmail();
    await signUpPage.fillEmailField('1');
    await signUpPage.assertAriaInvalidLocatorIsTruthy();
})

test('Verify that the password must contain more than 6 characters.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillPasswordField('1');
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertPasswordErrorMessageIsVisible();
})


test('Verify that the password entered by the user is hidden.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.assertPasswordIsHidden();
})

test('Verify that the user can view their password.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickOnViewPasswordButton();
    await signUpPage.getPasswordFieldValue();
    await signUpPage.assertPasswordValueAndAttribute();
})


test('Verify that the a user cannot register unless the "Policy and Better.News.io Terms & Conditions" has been accepted.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.defaultEmail);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertCurrentUrlEqualsExpectedSignUpURL();
    
})
test('Verify that the user can register his account.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.fillEmailField(signUpPage.randomEmail);
    await signUpPage.fillPasswordField(signUpPage.defaultPassword);
    await signUpPage.fillRepeatPasswordField(signUpPage.defaultPassword);
    await signUpPage.clickAtPrivacyPolicyCheckbox();
    await signUpPage.clickAtSignUpButton();
    await signUpPage.assertTitleContainsCheckYourEmailText();
})

test('Verify that the "Log In" button is working.', async({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.clickOnLogInButton();
    await signUpPage.assertCurrentUrlEqualsExpectedSignInURL();
})