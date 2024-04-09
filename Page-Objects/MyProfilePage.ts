import { Page, expect } from "@playwright/test";

export class MyProfilePage {
    readonly page: Page;
    readonly defaultEmail: string;
    readonly defaultPassword: string;
    readonly landingPageURL: string;
    readonly myProfilePageURL: string;
    readonly mainPageURL: string;
    readonly defaultName: string;

    constructor(page) {
        this.page = page;
        this.defaultEmail = 'maksym.hanhur+1@hebronsoft.com'
        this.defaultPassword = 'test123'
        this.landingPageURL = 'https://stage.dailybuild.com/landing'
        this.myProfilePageURL = 'https://stage.dailybuild.com/profile'
        this.mainPageURL = 'https://stage.dailybuild.com/'
        this.defaultName = 'Maksym'
    }
    
    async getLogoInHeader() {
        return this.page.locator('.logo-text')
    }
    async getLogInTextButton(){
        return this.page.locator('.header-config-login')
    }
    async getSearchField(){
        return this.page.getByPlaceholder('Search')
    }
    async getNavigationSection(){
        return this.page.locator('.navigation-section')
    }
    async getAddNewsButton(){
        return this.page.locator('.header-container .add-news-btn')
    }
    async getUserAvatar() {
        return this.page.locator('.person-image.avatar')
    }
    async getTopCommunitiesContainer() {
        return this.page.locator('.left-sidebar-container')
    }
    async getBreadcrumb() {
        return this.page.locator('.breadCrumbs')
    }
    async getAvatarContainer(){
        return this.page.locator('.person-image-container')
    }
    async getBurgerMenu() {
        return this.page.locator('.user-menu-container')
    }
    async getFooterLogo(){
        return this.page.locator('footer .logo')
    }
    async getFooterMenuArray(){
        return this.page.locator('.footer-menu li')
    }
    async getFooterAddNewsButton(){
        return this.page.locator('footer .main-btn')
    }
    async getFeedbackButton(){
        return this.page.getByRole('button', {name: 'Feedback'})
    }
    async getProfileImage() {
        return this.page.locator('.user-personal-information-image')
    }
    async getProfileName() {
        return this.page.locator('.user-name-container')
    }
    async getProfileTitle(){
        return this.page.locator('.user-title')
    }
    async getProfileCountry(){
        return this.page.locator('.country')
    }
    async getProfileTimezone(){
        return this.page.locator('.timeZone p')
    }
    async getEditTextButton(){
        return this.page.locator('.profile_user-info-controls a')
    }
    async getLogoutButton(){
        return this.page.getByText('Log out')
    }
    async getCurrentURL() {
        return this.page.url();
    }
    async getEditProfileText(){
        return this.page.getByText('Edit Profile')
    }
    async getUserNameLabel(){
        return this.page.getByLabel('User Name')
    }
    async getUserTitleLabel(){
        return this.page.getByLabel('User Title')
    }
    async getUserCountryLabel(){
        return this.page.getByLabel('Time zone:')
    }
    async getUserTimezoneLabel(){
        return this.page.getByLabel('User Title')
    }
    async getUserPhoto(){
        return this.page.locator('#fileDropRef2')
    }
    async getCancelTextButton(){
        return this.page.getByText('Cancel')
    }
    async getSaveButton(){
        return this.page.locator("button[aria-label='Logout']")
    }
    async getCurrentProfileName() {
        return await (await this.getProfileName()).textContent()
    }
    async getUserNameIsRequiredErrorMessage() {
        return this.page.getByText('Please, enter correct data')
    }
    async getUserNameHasLimitCharactersErrorMessage() {
        return this.page.getByText('This field must be shorter than or equal to 30 characters')
    }
    async getUserTitleHasLimitCharactersErrorMessage() {
        return this.page.getByText('This field must be shorter than or equal to 30')
    }
    
    async expandCountryList() {
        await this.page.getByPlaceholder('Country').click()
    }
    async expandTimezoneList() {
        await this.page.getByPlaceholder('Time zone').click()
    }
    async waitForMainPageURL() {
        await this.page.waitForURL(this.mainPageURL);
    }
    async goToLandingPage() {
        await this.page.goto(this.landingPageURL)
    }
    
    async fillEmailField() {
        await this.page.getByRole('textbox', {name: 'Email'}).fill(this.defaultEmail)
    } 
    async fillPasswordField() {
        await this.page.getByRole('textbox', {name: 'Password'}).fill(this.defaultPassword)
    }
    async fillUserNameField(name: string){
        await this.page.getByRole('textbox', {name: 'name'}).fill(name)
    } 
    async fillUserTitleField(name: string){
        await this.page.getByLabel('User Title').fill(name)
    } 
    async clickOnNextButton() {
        await this.page.getByRole('button', {name: 'Next'}).click()
    }
    async clickOnLogInTextButton() {
        await this.page.locator('div app-header-user-auth-profile').click()
    }
    async clickOnLogInButton() {
        await this.page.getByRole('button', {name: 'Login'}).click()
    }
    async clickOnUserAvatar() {
        await (await this.getUserAvatar()).click()
    }
    async clickOnMyProfileButton() {
        await this.page.getByText('My Profile').click()
    }
    async clickOnLogOutButton(){
       await (await this.getLogoutButton()).click()
    }
    async clickOnEditTextButton() {
        await (await this.getEditTextButton()).click()
    }
    async clickOnUploadPhoto() {
        await (await this.getUserPhoto()).click()
    }
    async clickOnSaveButton(){
        await (await this.getSaveButton()).click()
    }
    async clickOnCancelButton() {
        await (await this.getCancelTextButton()).click()
    }
    async resizePageResolution() {
        await this.page.setViewportSize({ width: 1360, height: 768 });
    }
    async assertLogoContainsNameOfTheSite() {
        await expect(await this.getLogoInHeader()).toContainText('DailyBuild.com')
    }
    async assertSearchFieldIsVisible() {
        await expect(await this.getSearchField()).toBeVisible();
    }
    async assertNavigationSectionToBeVisible(){
        await expect(await this.getNavigationSection()).toBeVisible();
    }
    async assertAddNewsButtonToBeVisible(){
        await expect(await this.getAddNewsButton()).toBeVisible();
    }
    async assertUserAvatarToBeVisible() {
        await expect(await this.getUserAvatar()).toBeVisible();
    }
    async assertLeftSideBarContainsTopCommunities() {
        await expect(await this.getTopCommunitiesContainer()).toContainText('Top 10 communities')
    }
    async assertLeftSideBarContainsShowMoreButton() {
        await expect(await this.getTopCommunitiesContainer()).toContainText('Show More')
    }
    async assertBreadcrumbToBeVisible() {
        await expect(await this.getBreadcrumb()).toBeVisible()
    }
    async assertBurgerMenuIsExpanded() {
        await expect(await this.getAvatarContainer()).toHaveAttribute('aria-expanded','true')
    }
    async assertBurgerMenuToBeVisible(){
        await expect(await this.getBurgerMenu()).toBeVisible();
    }
    async assertFooterLogoToContainsNameOfTheSite() {
        await expect(await this.getFooterLogo()).toContainText('DailyBuild.com')
    }
    async assertFooterMenuArray() {
        const arrayItems = ['ABOUT US', 'CONTACT US','TAGS','COMMUNITIES','PUBLISHERS','PRIVACY POLICY','COOKIE POLICY','TERMS OF USE']
        await expect(await this.getFooterMenuArray()).toContainText(arrayItems)
    }
    async assertFooterAddNewsButtonToBeVisible(){
        await expect(await this.getFooterAddNewsButton()).toBeVisible()
    }
    async assertFeedbackButtonToBeVisible(){
        await expect(await this.getFeedbackButton()).toBeVisible()
    }
    async assertProfileImageToBeVisible(){
        await expect(await this.getProfileImage()).toBeVisible()
    }
    async assertProfileNameToBeVisible(){
        await expect(await this.getProfileName()).toBeVisible()
    }
    async assertProfileTitleToBeVisible(){
        await expect(await this.getProfileTitle()).toBeVisible()
    }
    async assertProfileCountryToBeVisible(){
        await expect(await this.getProfileCountry()).toBeVisible()
    }
    async assertProfileTimezoneToBeVisible(){
        await expect(await this.getProfileTimezone()).toBeVisible()
    }
    async assertEditTextButtonToBeVisible(){
        await expect(await this.getEditTextButton()).toBeVisible()
    }
    async assertLogoutButtonToBeVisible(){
        await expect(await this.getLogoutButton()).toBeVisible()
    }
    async assertCurrentPageURLEqualToMainPageURL(){
        expect(await this.getCurrentURL()).toEqual(this.mainPageURL)
    }
    async assertLogInTextButtonToBeVisibleAfterLogOut(){
        await expect(await this.getLogInTextButton()).not.toBeVisible()
        await this.clickOnLogOutButton()
        await expect(await this.getLogInTextButton()).toBeVisible()
    }
    async assertEditProfileText(){
        await expect(await this.getEditProfileText()).toBeVisible()
    }
    async assertUserNameLabelToBeVisible() {
        await expect(await this.getUserNameLabel()).toBeVisible()
    }
    async assertUserTitleLabelToBeVisible() {
        await expect(await this.getUserTitleLabel()).toBeVisible()
    }
    async assertUserCountryLabelToBeVisible() {
        await expect(await this.getUserCountryLabel()).toBeVisible()
    }
    async assertUserTimezoneLabelToBeVisible() {
        await expect(await this.getUserTimezoneLabel()).toBeVisible()
    }
    async assertUserPhotoToBeVisible() {
        await expect(await this.getUserPhoto()).toBeVisible()
    }
    async assertCancelTextButtonToBeVisible() {
        await expect(await this.getCancelTextButton()).toBeVisible()
    }
    async assertSaveButtonToBeVisible() {
        await expect(await this.getSaveButton()).toBeVisible()
    }
    
    async fillUserNameFieldWithRandomSymbols() {
        function generateRandomString(length: number) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
        const randomText = generateRandomString(10)
        await this.fillUserNameField(randomText)
    }
    async fillUserTitleFieldWithRandomSymbols() {
        function generateRandomString(length: number) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
        const randomText = generateRandomString(10)
        await this.fillUserTitleField(randomText)
    }
    async clickAtRandomCountryOption() {
        const locators = this.page.locator('.country-option');
        const elements = await locators.all();
        const randomIndex = Math.floor(Math.random() * elements.length);
        await elements[randomIndex].click();
    }
    async clickAtRandomTimezoneOption() {
        const locators = this.page.locator('.timeZone-option');
        const elements = await locators.all();
        const randomIndex = Math.floor(Math.random() * elements.length);
        await elements[randomIndex].click();
    }

    async waitForCancelButtonNotVisible() {
        await expect(await this.getCancelTextButton()).not.toBeVisible()
    }
    async assertUserNameIsEdited() {
        const previousName = await (await this.getProfileName()).textContent()
        await this.fillUserNameFieldWithRandomSymbols();
        await this.clickOnSaveButton();
        await this.waitForCancelButtonNotVisible();
        const currentName = await (await this.getProfileName()).textContent();
        expect(currentName).not.toEqual(previousName);
    }
    async assertUserTitleIsEdited() {
        const previousTitle = await (await this.getProfileTitle()).textContent()
        await this.fillUserTitleFieldWithRandomSymbols();
        await this.clickOnSaveButton();
        await this.waitForCancelButtonNotVisible();
        const currentTitle = await (await this.getProfileTitle()).textContent();
        expect(currentTitle).not.toEqual(previousTitle);
    }
    async assertUserCountryIsEdited() {
        const previousCountry = await (await this.getProfileCountry()).textContent()
        await this.clickAtRandomCountryOption();
        await this.clickOnSaveButton();
        await this.waitForCancelButtonNotVisible();
        const currentCountry = await (await this.getProfileCountry()).textContent();
        expect(currentCountry).not.toEqual(previousCountry);
    }
    async assertUserTimezoneIsEdited() {
        const previousTimezone = await (await this.getProfileTimezone()).textContent()
        await this.clickAtRandomTimezoneOption();
        await this.clickOnSaveButton();
        await this.waitForCancelButtonNotVisible();
        await this.page.reload();
        const currentTimezone = await (await this.getProfileTimezone()).textContent();
        expect(currentTimezone).not.toEqual(previousTimezone);
    }
    async assertAfterClickOnCancelButtonNothingChanges() {
        const previousName = await (await this.getProfileName()).textContent()
        const previousTitle = await (await this.getProfileTitle()).textContent()
        const previousCountry = await (await this.getProfileCountry()).textContent()
        const previousTimezone = await (await this.getProfileTimezone()).textContent()
        await this.fillUserNameFieldWithRandomSymbols();
        await this.fillUserTitleFieldWithRandomSymbols();
        await this.expandCountryList();
        await this.clickAtRandomCountryOption();
        await this.expandTimezoneList();
        await this.clickAtRandomTimezoneOption();
        await this.clickOnCancelButton();
        await this.waitForCancelButtonNotVisible();
        const currentName = await (await this.getProfileName()).textContent();
        const currentTitle = await (await this.getProfileTitle()).textContent();
        const currentCountry = await (await this.getProfileCountry()).textContent();
        const currentTimezone = await (await this.getProfileTimezone()).textContent();
        
        expect(currentName).toEqual(previousName);
        expect(currentTitle).toEqual(previousTitle);
        expect(currentCountry).toEqual(previousCountry);
        expect(currentTimezone).toEqual(previousTimezone)
    }
    async assertUserNameIsRequired() {
        await (await this.getUserNameLabel()).clear()
        await (await this.getSaveButton()).click()
        await expect(await this.getUserNameIsRequiredErrorMessage()).toBeVisible();
    }
    async assertUserNameHasLimitOfSymbols() {
        await this.fillUserNameField('213321321321331213232113213213d') // 32 symbols
        await (await this.getSaveButton()).click()
        await expect(await this.getUserNameHasLimitCharactersErrorMessage()).toBeVisible();
    }

    async assertUserTitleHasLimitOfSymbols() {
        await this.fillUserTitleField('213321321321331213232113213213d') // 32 symbols
        await (await this.getSaveButton()).click()
        await expect(await this.getUserTitleHasLimitCharactersErrorMessage()).toBeVisible();
    }
}