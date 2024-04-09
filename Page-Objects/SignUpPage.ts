import { Page, expect } from "@playwright/test";
import { v4 as uuidv4 } from 'uuid';

export class SignUpPage {
    readonly page: Page;
    readonly signInURL: string;
    readonly mainPageURL: string;
    readonly signUpURL: string;
    readonly landingPageURL: string;
    readonly defaultEmail: string;
    readonly defaultPassword: string;
    readonly exampleEmail: string;
    readonly randomEmail: string;
    
    constructor(page) {
        this.page = page;
        this.signInURL = 'https://stage.dailybuild.com/auth/sign-in';
        this.mainPageURL = 'https://stage.dailybuild.com/' 
        this.signUpURL = 'https://stage.dailybuild.com/auth/sign-up'
        this.defaultEmail = 'maksym.hanhur+1@hebronsoft.com'
        this.defaultPassword = 'test123'
        this.exampleEmail = 'email@example.com'
        this.randomEmail = `testuser+${uuidv4()}@example.com`;
        this.landingPageURL = 'https://stage.dailybuild.com/landing'
    }

    async navigateTo() {
        await this.page.goto(this.landingPageURL);
    }
    async fillEmailBeforeEach(email) {
        await this.page.getByPlaceholder('Email').fill(email);
    }

    async clickNextButton() {
        await this.page.getByRole('button', {name: 'Next'}).click();
    }

    async clickUserProfile() {
        await this.page.locator('div app-header-user-auth-profile').click()
    }
    async clickOnSignUpText() {
        await this.page.getByText('Sign up').click()
    }
    async getCurrentURL() {
        return this.page.url();
    }
    async waitForSignUpURL() {
        await this.page.waitForURL(this.signUpURL);
    }
    async getEmailField() {
        return this.page.getByRole('textbox', {name: 'Email'})
    }

    async getPasswordField() {
        return this.page.getByRole('textbox', {name: 'Enter password'})
    }

    async getRepeatPasswordField() {
        return this.page.getByPlaceholder('Repeat password')
    }

    async getSignUpButton() {
        return this.page.getByRole('button', {name: 'Register'})
    }

    async getSignUpWithGoogleButton() {
        return this.page.getByText('Sign up with')
    }

    async getCheckboxWithPrivacyPolicy() {
        return this.page.locator('mat-checkbox')
    }
    async getLogInTextButton() {
        return this.page.locator('.sign-up_hint-link')
    }
    
    async getNumberOfValidationMessages () {
        return this.page.locator('.mat-mdc-form-field-error')
    }
    async getEmailErrorMessage() {
        return this.page.locator('.mat-mdc-form-field-error').first().textContent()
    }
    async getEmailPlaceHolderValue() {
        const emailField = await this.getEmailField()
        return emailField.getAttribute('placeholder')
    }
    async getEmailAriaLocator() {
        const emailField = await this.getEmailField()
        return emailField.getAttribute('aria-invalid')
    }
    async getPasswordErrorMessage() {
        return this.page.getByText('Password with less than 6 characters.')
    }
    async getPasswordFieldValue(){
        await (await this.getPasswordField()).inputValue()
    }
    async getTitleText() {
        return this.page.locator('.title.title-row--part').textContent()
    }
    async clickOnViewPasswordButton() {
        await this.page.locator('.mat-mdc-form-field-icon-suffix').first().click()
    }
    async clearEmailField() {
        await (await this.getEmailField()).clear()
    }
    async fillEmailField(email: string) {
        await (await this.getEmailField()).fill(email)
    }
    async fillPasswordField(password: string) {
        await (await this.getPasswordField()).fill(password)
    }
    async fillRepeatPasswordField(password: string) {
        await (await this.getRepeatPasswordField()).fill(password)
    }
    async clickAtPrivacyPolicyCheckbox() {
        await (await this.getCheckboxWithPrivacyPolicy()).click()
    }
    async clickAtSignUpButton() {
        await (await this.getSignUpButton()).click()
    }
    async assertCurrentUrlEqualsExpectedSignUpURL() {
        expect(await this.getCurrentURL()).toEqual(this.signUpURL);
    }
    async assertCurrentUrlEqualsExpectedSignInURL() {
        expect(await this.getCurrentURL()).toEqual(this.signInURL);
    }
    async assertEmailFieldIsVisible() {
        await expect(await this.getEmailField()).toBeVisible()
    }
    async assertPasswordFieldIsVisible() {
        await expect(await this.getPasswordField()).toBeVisible()
    }
    async assertRepeatPasswordFieldIsVisible() {
        await expect(await this.getRepeatPasswordField()).toBeVisible()
    }
    async assertSignUpButtonIsVisible() {
        await expect(await this.getSignUpButton()).toBeVisible()
    }
    async assertSignUpWithGoogleButtonIsVisible() {
        await expect(await this.getSignUpWithGoogleButton()).toBeVisible()
    }
    async assertCheckboxOfPrivacyPolicyIsVisible() {
        await expect(await this.getCheckboxWithPrivacyPolicy()).toBeVisible()
    }
    async assertSignUpButtonToBeEnabled() {
        await expect(await this.getSignUpButton()).toBeEnabled()
    }
    async assertNumberOfValidationErrorMessages(numberOfErrors: number) {
        await expect(await this.getNumberOfValidationMessages()).toHaveCount(numberOfErrors)
    }
    async assertEmailFieldShouldContainCorrectEmail() {
        expect(await this.getEmailErrorMessage()).toContain('Enter correct email')
    }
    async assertPlaceholderValueContainsExampleEmail() {
        expect(await this.getEmailPlaceHolderValue()).toEqual(this.exampleEmail)
    }
    async assertAriaInvalidLocatorIsTruthy () {
        expect(await this.getEmailAriaLocator()).toBeTruthy()
    }
    async assertPasswordErrorMessageIsVisible() {
        await expect(await this.getPasswordErrorMessage()).toBeVisible()
    }
    async assertPasswordValueAndAttribute() {  
        await expect(await this.getPasswordField()).toHaveAttribute('type','text')
        await expect(await this.getPasswordField()).toHaveValue(this.defaultPassword)
    }
    async assertPasswordIsHidden() {
        await expect(await this.getPasswordField()).toHaveAttribute('type','password')
    }
    async clickOnLogInButton() {
        await(await this.getLogInTextButton()).click()
    }
    async assertTitleContainsCheckYourEmailText() {
        expect(await this.getTitleText()).toContain('Check your email!')
    }
}