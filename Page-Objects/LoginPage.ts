import { Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly signInURL: string;
    readonly mainPageURL: string;
    readonly signUpURL: string;
    readonly landingPageURL: string;
    readonly defaultEmail: string;
    readonly defaultPassword: string;
    
    constructor(page) {
        this.page = page;
        this.signInURL = 'https://stage.dailybuild.com/auth/sign-in';
        this.mainPageURL = 'https://stage.dailybuild.com/' 
        this.signUpURL = 'https://stage.dailybuild.com/auth/sign-up'
        this.defaultEmail = 'maksym.hanhur+1@hebronsoft.com'
        this.defaultPassword = 'test123'
        this.landingPageURL = 'https://stage.dailybuild.com/landing'
    }

    async navigateTo() {
        await this.page.goto(this.landingPageURL);
    }

    async fillEmail(email) {
        await this.page.getByPlaceholder('Email').fill(email);
    }

    async clickNextButton() {
        await this.page.getByRole('button', {name: 'Next'}).click();
    }

    async clickUserProfile() {
        await this.page.locator('div app-header-user-auth-profile').click()
    }
    async clickOnPasswordField() {
        await(await this.getPasswordField()).click()
    }
    async waitForSignInURL() {
        await this.page.waitForURL(this.signInURL);
    }
    async waitForMainPageURL() {
        await this.page.waitForURL(this.mainPageURL);
    }
    async waitForSignUpURL() {
        await this.page.waitForURL(this.signUpURL);
    }

    async getCurrentURL() {
        return this.page.url();
    }
    async getEmailField() {
        return this.page.getByRole('textbox', {name: 'Email'})
    }
    async fillEmailField(email: string) {
        await (await this.getEmailField()).fill(email)
    }

    async getPasswordField() {
        return this.page.getByRole('textbox', {name: 'Password'})
    }
    async fillPasswordField(password: string) {
        await (await this.getPasswordField()).fill(password)
    }

    async getForgotPasswordButton() {
        return this.page.getByText('Forgot password?')
    }

    async getLogInButton() {
        return this.page.getByRole('button', {name: 'Login'})
    }

    async getSignUpButton() {
        return this.page.getByText('Sign Up')
    }

    async getSignInWithGoogleButton() {
        return this.page.getByRole('button', {name: 'Sign in with'})
    }
    async getPasswordErrorMessage() {
        return this.page.locator('.mat-mdc-form-field-error').textContent()
    }
    
    async getEmailErrorMessage() {
        return this.page.locator('.mat-mdc-form-field-error').first().textContent()
    }

    async getValidationErrorMessage() {
        return this.page.locator('.mdc-snackbar__label').textContent()
    }
    
    async getEmailPlaceholderValue() {
        return (await this.getEmailField()).getAttribute('placeholder');
    }

    async getAriaInvalidAttributeValue() {
        return (await this.getEmailField()).getAttribute('aria-invalid');
    }

    async clickOnViewPasswordButton () {
        await this.page.locator('.mat-mdc-form-field-icon-suffix').click()
    }
    async clickOnSignUpTextButton () {
        await this.page.getByText('Sign up').click()
    }
    async clearEmailField() {
        const emailField = await this.getEmailField()
        await emailField.clear()
    }
    async clickOnLogInButton() {
        const logInButton = await this.getLogInButton();
        await logInButton.click({force:true})
    }
    async assertCurrentUrlEqualsExpectedSignInURL() {
        expect(await this.getCurrentURL()).toEqual(this.signInURL);
    }
    async assertCurrentUrlEqualsExpectedSignUpURL() {
        expect(await this.getCurrentURL()).toEqual(this.signUpURL);
    }
    async assertCurrentUrlEqualsExpectedMainURL() {
        expect(await this.getCurrentURL()).toEqual(this.mainPageURL);
    }
    
    async assertValidationErrorMessageIsUnauthorized() {
        expect(await this.getValidationErrorMessage()).toContain('Unauthorized')
    }
    async assertPasswordErrorMessageContainsNotLessThanSixSymbols() {
        expect(await this.getPasswordErrorMessage()).toContain('Password with less than 6 characters.')
    }
    
    async assertEmailFieldIsVisible() {
        await expect(await this.getEmailField()).toBeVisible();
    }
    async assertPasswordFieldIsVisible() {
        await expect(await this.getPasswordField()).toBeVisible();
    }
    async assertForgotPasswordButtonIsVisible() {
        await expect(await this.getForgotPasswordButton()).toBeVisible();
    }
    async assertLogInButtonIsVisible() {
        await expect(await this.getLogInButton()).toBeVisible();
    }
    async assertSignUpButtonIsVisible() {
        await expect(await this.getSignUpButton()).toBeVisible();
    }
    async assertSignUpWithGoogleButtonIsVisible() {
        await expect(await this.getSignInWithGoogleButton()).toBeVisible();
    }
    async assertLogInButtonIsDisabled() {
        await expect(await this.getLogInButton()).toBeDisabled()
    }
    async assertPasswordIsHidden() {
        expect(await this.getPasswordField()).toHaveAttribute('type','password')
    }
    async assertPasswordValueAndAttribute() {  
        await expect(await this.getPasswordField()).toHaveAttribute('type','text')
        await expect(await this.getPasswordField()).toHaveValue(this.defaultPassword)
    }
    async getPasswordFieldValue(){
        await (await this.getPasswordField()).inputValue()
    }
    async assertPasswordFieldHasErrorMessageIsRequired() {
        expect(await this.getPasswordErrorMessage()).toContain('This field is required.')
    }
    async assertEmailShouldContainSpecialCharacters() {
        expect(await this.getEmailErrorMessage()).toContain('Enter correct email')
    }
    async assertEmailsPlaceholderValue() {
        expect(await this.getEmailPlaceholderValue()).toEqual('email@example.com')
    }
    async assertEmailsAriaAttributeValue(){
        expect(await this.getAriaInvalidAttributeValue()).toBeTruthy()
    }
    
}