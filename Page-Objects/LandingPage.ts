import { Page, expect } from "@playwright/test";
import { v4 as uuidv4 } from 'uuid';

export class LandingPage {
    readonly page: Page;
    readonly signInURL: string;
    readonly mainPageURL: string;
    readonly signUpURL: string;
    readonly defaultEmail: string;
    readonly defaultPassword: string;
    readonly landingPageURL: string;
    readonly randomEmail: string;
    readonly communitiesLandingPageURL: string;
    readonly landingFinalPageURL: string;
    
    constructor(page) {
        this.page = page;
        this.signInURL = 'https://stage.dailybuild.com/auth/sign-in';
        this.mainPageURL = 'https://stage.dailybuild.com/' 
        this.signUpURL = 'https://stage.dailybuild.com/auth/sign-up'
        this.defaultEmail = 'maksym.hanhur+1@hebronsoft.com'
        this.defaultPassword = 'test123'
        this.landingPageURL = 'https://stage.dailybuild.com/landing'
        this.randomEmail = `testuser+${uuidv4()}@example.com`;
        this.communitiesLandingPageURL = 'https://stage.dailybuild.com/landing/communities'
        this.landingFinalPageURL = 'https://stage.dailybuild.com/landing/final'
    }

    async goToLandingPage() {
        await this.page.goto(this.landingPageURL)
    }
    async waitForLandingPageURL() {
        await this.page.waitForURL(this.landingPageURL);
    }
    async waitForMainPageURL() {
        await this.page.waitForURL(this.mainPageURL);
    }
    async waitForCommunitiesLandingPageURL() {
        await this.page.waitForURL(this.communitiesLandingPageURL);
    }
    async waitForSwitchesSelector() {
        await this.page.waitForSelector('.mdc-switch__icon--off')
    }
    async waitForPrivacyPolicyTitle(){
        await this.getPrivacyPolicyTitle()
    }
    async getCurrentURL() {
        return this.page.url();
    }
    async getEmailField() {
        return this.page.getByRole('textbox', {name: 'Email'})
    }
    async getNextButton() {
        return this.page.getByRole('button', {name: 'Next'})
    }
    async getDescriptionTextOfThePage() {
        return this.page.locator('.step-section--description')
    }
    async getSignInWithGoogleButton() {
        return this.page.getByText('Sign in with')
    }
    async getPrivacyPolicyButton() {
        return this.page.getByText('Privacy Policy')
    }
    async getPrivacyPolicyTitle() {
        return this.page.locator('.privacy-policy_title')
    }
    async getSubscribeButton() {
        return this.page.getByRole('button', {name: "Subscribe"})
    }
    async getSkipButton() {
        return this.page.getByRole('button', {name: "Skip"})
    }
    async getCongratulionText() {
        return this.page.getByText('Congratulations').textContent()
    }
    async getSwitchButtons() {
        return this.page.locator('.mdc-switch__icon--off')
    }
    async getCommunityNames() {
        return this.page.locator('.community-item_title')
    }
    async getCommunityImages() {
        return this.page.locator('.community-item_img')
    }
    async getCommunityDescriptions() {
        return this.page.locator('.community-info-block')
    }
    async getBackButton() {
        return this.page.getByRole('button', {name: 'Back'})
    }
    async getGoToDailyBuildButton() {
        return this.page.getByRole('button', {name: 'Go to DailyBuild'})
    }
    async getLowestText() {
        return this.page.getByText('Questions')
    }
    async getCloseButton() {
        return this.page.locator('.cross-icon')
    }
    async scrollLowestTextIntoTheView() {
        await (await this.getLowestText()).scrollIntoViewIfNeeded();
    }
    async scrollCloseButtonIntoTheView() {
        await (await this.getCloseButton()).scrollIntoViewIfNeeded()
    }
    async fillRandomEmail() { 
        await this.page.getByRole('textbox', {name: 'Email'}).fill(this.randomEmail)
    }
    async fillEmailField(email: string) {
        await this.page.getByRole('textbox', {name: 'Email'}).fill(email)
    } 
    async checkSwitchButtons() {
        for(const switchButton of await (await this.getSwitchButtons()).all()){
            await switchButton.check()
        }
    }
    async clickOnNextButton() {
        await (await this.getNextButton()).click()
    }
    async clickOnSkipButton(){
        await (await this.getSkipButton()).click()
    }
    async clickOnPrivacyPolicyButton () {
       await (await this.getPrivacyPolicyButton()).click()
    }
    async clickOnSubscribeButton() {
        await (await this.getSubscribeButton()).click()
    }
    async clickOnBackButton() {
        await (await this.getBackButton()).click()
    }
    async clickOnGoToDailyBuildButton() {
        await (await this.getGoToDailyBuildButton()).click()
    }
    async clickOnCloseButton() {
        await (await this.getCloseButton()).click()
    }
    async reloadPage() {
        await this.page.reload();
    }
    async assertCurrentUrlEqualsExpectedLandingPageURL() {
        expect(await this.getCurrentURL()).toEqual(this.landingPageURL);
    }
    async assertPrivacyPolicyButtonIsVisible() {
        await expect(await this.getPrivacyPolicyButton()).toBeVisible()
    }
    async assertSignInWithGoogleButtonIsVisible() {
        await expect(await this.getSignInWithGoogleButton()).toBeVisible()
    }
    async assertDescriptionTextOfThePageIsVisible() {
        await expect(await this.getDescriptionTextOfThePage()).toBeVisible()
    }
    async assertNextButtonIsVisible() {
        await expect(await this.getNextButton()).toBeVisible()
    }
    async assertEmailFieldIsVisible() {
        await expect(await this.getEmailField()).toBeVisible()
    }
    async assertCurrentUrlEqualsExpectedLandingCommunitiesURL() {
        expect(await this.getCurrentURL()).toEqual(this.communitiesLandingPageURL);
    }
    async assertPrivacyPolicyIsNotVisible() {
        await expect(await this.getPrivacyPolicyTitle()).not.toBeVisible()
    }
    async assertPrivacyPolicyIsVisible() {
        await expect(await this.getPrivacyPolicyTitle()).toBeVisible()
    }
    async assertNextButtonIsDisabled() {
        await expect(await this.getNextButton()).toBeDisabled()
    }
    async assertSubscribeButtonToBeDisabled(){
        await expect(await this.getSubscribeButton()).toBeDisabled()
    }
    async assertCurrentUrlEqualsExpectedMainPageURL() {
        expect(await this.getCurrentURL()).toEqual(this.mainPageURL);
    }
    async assertCongratulationText() {
        expect(await this.getCongratulionText()).toEqual('Congratulations')
    }
    async assertCheckButtonsAreChecked() {
        for(const switchButton of await (await this.getSwitchButtons()).all()){
            await switchButton.check()
            expect(await switchButton.isChecked()).toBeTruthy()
        }
    }
    async assertCheckButtonsAreNotChecked() {
        for(const switchButton of await (await this.getSwitchButtons()).all()){
            await switchButton.uncheck()
            expect(await switchButton.isChecked()).toBeFalsy()
        }
    }
    async assertCommunityNamesAreVisible() {
        for(const name of await (await this.getCommunityNames()).all()){
            await expect(name).toBeVisible()
        }
    }
    async assertCommunityImagesAreVisible() {
        for(const name of await (await this.getCommunityImages()).all()){
            await expect(name).toBeVisible()
        }
    }
    async assertCommunityDescriptionsAreVisible() {
        for(const name of await (await this.getCommunityDescriptions()).all()){
            await expect(name).toBeVisible()
        }
    }
    async assertCurrentUrlEqualsExpectedLandingFinalPageURL() {
        expect(await this.getCurrentURL()).toEqual(this.landingFinalPageURL);
    }
}