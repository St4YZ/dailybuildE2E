import { Page, expect } from "@playwright/test";

export class MyArticlesPage {
    readonly page: Page;
    readonly defaultEmail: string;
    readonly defaultPassword: string;
    readonly specificEmail: string;
    readonly landingPageURL: string;
    readonly mainPageURL: string;
    readonly defaultName: string;
    readonly createArticlePage: string;
    readonly defaultText: string;
    readonly myArticlePage: string;

    constructor(page) {
        this.page = page;
        this.defaultEmail = 'maksym.hanhur+1@hebronsoft.com'
        this.defaultPassword = 'test123'
        this.specificEmail = 'maksym.hanhur+2@hebronsoft.com'
        this.landingPageURL = 'https://stage.dailybuild.com/landing'
        this.mainPageURL = 'https://stage.dailybuild.com/'
        this.defaultName = 'Maksym'
        this.createArticlePage = "https://stage.dailybuild.com/my-articles/create"
        this.defaultText = 'testtext'
        this.myArticlePage = 'https://stage.dailybuild.com/profile/my-articles'
    }
    async beforeEachGoToMyArticlesPage() {
        await this.goToLandingPage();
        await this.fillEmailField();
        await this.clickOnNextButton()
        await this.clickOnLogInTextButton();
        await this.fillEmailField();
        await this.fillPasswordField();
        await this.clickOnLogInButton();
        await this.clickOnUserAvatar();
        await this.clickOnMyArticlesButton();
    }
    async goToLandingPage() {
        await this.page.goto(this.landingPageURL)
    }
    async waitForCreateArticlePage() {
        await this.page.waitForURL(this.createArticlePage)
    }
    async getPublishedCell() {
        return this.page.locator('.ag-header-container [col-id="publicationDate"]')
    }
    async getNewsTitleCell() {
        return this.page.locator('.ag-header-container [col-id="title"]')
    }
    async getPublisherCell() {
        return this.page.locator('.ag-header-container [col-id="publisher"]')
    }
    async getTagsCell() {
        return this.page.locator('.ag-header-container [col-id="tags"]')
    }
    async getStatusCell() {
        return this.page.locator('.ag-header-container [col-id="publishStatus"]')
    }
    async getCurrentURL() {
        return this.page.url();
    }
    async getUserAvatar() {
        return this.page.locator('.person-image.avatar')
    }
    async getUserWithoutAvatar() {
        return this.page.locator('.person-image-container')
    }
    async getHeaderTableTexts() {
        return this.page.locator('.ag-header-cell-text')
    }
    async getCreateArticleButton() {
        return this.page.getByText('Create Article')
    }
    async getLogoutButton(){
        return this.page.getByText('Log out')
    }
    async getPopup() {
        return this.page.locator('app-confirm-dialog')
    }
    async getTitleInput() {
        return this.page.getByRole('textbox', {name: 'title'})
    }
    async getTitleInputText() {
        return this.page.getByRole('textbox', {name: 'title'}).inputValue()
    }
    async getTagInput() {
        return this.page.getByPlaceholder('Select Tag')
    }
    async getAddTagButton() {
        return this.page.getByRole('button', {name: 'Add'})
    }
    async getIFrameDescriptionField() {
        const iframeHandle = await this.page.waitForSelector('[class="cke_wysiwyg_frame cke_reset"]');
        const iframeContent = await iframeHandle.contentFrame();
        return iframeContent.locator('[contenteditable="true"]')
    }
    async gettIFrameResizeButton() {
        return this.page.locator('#cke_1_resizer')
    }
    async getSaveChangesButton() {
        return this.page.locator('[aria-label="Save"]')
    }
    async getSaveAsDraftButton() {
        return this.page.getByRole('button', {name: 'Save as draft'})
    }
    async getShowPreviewButton() {
        return this.page.locator('[aria-label="Preview"]')
    }
    async getFieldIsRequiredErrorMessage() {
        return this.page.locator('.mat-mdc-form-field-error', {hasText: 'This field is required.'})
    }
    async getBodyTextButton() {
        return this.page.getByText('body')
    }
    async getArticlesTitle() {
        return this.page.locator('.ag-row-no-focus [col-id="title"]').allTextContents()
    }
    async getDropDownWithTags() {
        return this.page.locator('#mat-autocomplete-1')
    }
    async getCreatedTagInput(){
        return this.page.locator('.tags_list-item').textContent()
    }
    async getMinimalCharacterErrorField() {
        return this.page.getByText('Field must be at least 2 characters long.')
    }
    async getMaximumSymbolsErrorMessage() {
        return this.page.getByText('This field with more than 256 characters.')
    }
    async getMaximumDescriptionCharsErrorMessage() {
        return this.page.getByText('This field with more than 10000 characters.')
    }
    async waitForDropdownExpanded(){ 
        await this.page.waitForSelector('#mat-option-1')
    }
    async getLastTagInDropDown() {
        return this.page.getByRole('option')
    }
    async scrollToTheLastAndFirstTagInDropdown() {
        await ((await this.getLastTagInDropDown()).last()).scrollIntoViewIfNeeded()
        await ((await this.getLastTagInDropDown()).first()).scrollIntoViewIfNeeded()
    }
    async fillEmailField() {
        await this.page.getByRole('textbox', {name: 'Email'}).fill(this.defaultEmail)
    } 
    async fillSpecificEmail() {
        await this.page.getByRole('textbox', {name: 'Email'}).fill(this.specificEmail)
    }
    async fillPasswordField() {
        await this.page.getByRole('textbox', {name: 'Password'}).fill(this.defaultPassword)
    }
    async fillTitleTextInput() {
        await (await this.getTitleInput()).fill(this.defaultText)
    }
    async fillTagField() {
        await (await this.getTagInput()).fill(this.defaultText)
    }
    async fillTitleInputFieldWithDefaultText() {
        await (await this.getTitleInput()).fill(this.defaultText)
    }
    async fillDescriptionField(num: string) {
        await (await this.getIFrameDescriptionField()).fill(num)
    }
    async fillDescriptionInputField() {
        await (await this.getIFrameDescriptionField()).pressSequentially(this.defaultText)
    }
    async fillUserTitleFieldWithRandomSymbols(length: number) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
    }
    async fillUserTitleField(){
        await (await this.getTitleInput()).fill(await this.fillUserTitleFieldWithRandomSymbols(10))
    } 
    async fillUserTitleFieldWithUnusualChars() {
        await (await this.getTitleInput()).fill('!@#$%^&*()')
    }
    async fillTitleInputFieldWithOneChar() {
        await (await this.getTitleInput()).fill(await this.fillUserTitleFieldWithRandomSymbols(1))
    }
    async fillUserTitleFieldWithMaximumSymbols() {
        await (await this.getTitleInput()).fill(await this.fillUserTitleFieldWithRandomSymbols(258))
    }
    async fillDescriptionFieldWithRandomSymbols() {
        await (await this.getIFrameDescriptionField()).fill(await this.fillUserTitleFieldWithRandomSymbols(9994))
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
    async clickOnMyArticlesButton() {
        await this.page.getByText('My Articles').click()
    }
    async clickOnMyProfileButton() {
        await this.page.getByText('My Profile').click()
    }
    async clickOnLogOutButton(){
        await (await this.getLogoutButton()).click()
    }
    async clickOnWithoutAvatar() {
        await (await this.getUserWithoutAvatar()).click({force: true})
    }
    async clickOnCreateArticlesButton() {
        await (await this.getCreateArticleButton()).click();
    }
    async clickOnNewsTitleCell() {
        await (await this.getNewsTitleCell()).click()
    }
    async clickOnPublisherCell() {
        await (await this.getPublisherCell()).click()
    }
    async clickOnTagsCell() {
        await (await this.getTagsCell()).click()
    }
    async clickOnStatusCell() {
        await (await this.getStatusCell()).click()
    }
    async clickOnSaveChangesButton() {
        await (await this.getSaveChangesButton()).click();
    }
    async clickOnTagInput() {
        await (await this.getTagInput()).click();
    }
    async clickOnAddTagButton() {
        await (await this.getAddTagButton()).click()
    }
    async resizePageResolution() {
        await this.page.setViewportSize({ width: 1360, height: 768 });
    }
    async assertHeaderTableTexts() {
        const arrayItems = ['Published', 'News title','Publisher','Tags','Status']
        await expect(await this.getHeaderTableTexts()).toContainText(arrayItems)
    }
    async assertNumberOfHeaderTableTexts() {
        await expect(await this.getHeaderTableTexts()).toHaveCount(5)
    }
    async assertCreateArticleButtonToBeVisible() {
        await expect(await this.getCreateArticleButton()).toBeVisible();
    }
    async logOutAndLoginInSpecificAccount() {
        await this.clickOnUserAvatar();
        await this.clickOnMyProfileButton();
        await this.clickOnLogOutButton();
        await this.clickOnLogInTextButton();
        await this.fillSpecificEmail();
        await this.fillPasswordField();
        await this.clickOnLogInButton();
        await this.clickOnWithoutAvatar();
        await this.clickOnMyArticlesButton();
    }
    async assertPopUpIsVisible() {
        await expect(await this.getPopup()).toBeVisible();
    }
    async assertPopUpContainsExpectedText() {
        await expect(await this.getPopup()).toContainText('Please set your name')
    }
    async assertCurrentURLToEqualCreateArticlePage() {
        expect(await this.getCurrentURL()).toEqual(this.createArticlePage)
    }
    async assertPublishedSortToBeDescending() {
        await expect(await this.getPublishedCell()).toHaveAttribute('aria-sort', 'descending')
    }
    async assertNewsTitleSortToBeAscending() {
        await expect(await this.getNewsTitleCell()).toHaveAttribute('aria-sort', 'ascending')
    }
    async assertPublisherSortToBeAscending() {
        await expect(await this.getPublisherCell()).toHaveAttribute('aria-sort', 'ascending')
    }
    async assertTagsSortToBeAscending() {
        await expect(await this.getTagsCell()).toHaveAttribute('aria-sort', 'ascending')
    }
    async assertStatusSortToBeAscending() {
        await expect(await this.getStatusCell()).toHaveAttribute('aria-sort', 'ascending')
    }
    async assertNewsTitleSortToBeDescending() {
        await expect(await this.getNewsTitleCell()).toHaveAttribute('aria-sort', 'descending')
    }
    async assertNewsTitleSortToBeNone() {
        await expect(await this.getNewsTitleCell()).toHaveAttribute('aria-sort', 'none')
    }
    async assertTitleInputFieldToBeVisible() {
        await expect(await this.getTitleInput()).toBeVisible()
    }
    async assertTagInputToBeVisible() {
        await expect(await this.getTagInput()).toBeVisible()
    }
    async assertAddTagButtonToBeVisible() {
        await expect(await this.getAddTagButton()).toBeVisible()
    }
    async assertIFrameDescriptionFieldToBeVisible() {
        await expect(await this.getIFrameDescriptionField()).toBeVisible()
    }
    async assertSaveChangesButtonToBeVisible() {
        await expect(await this.getSaveChangesButton()).toBeVisible()
    }
    async assertSaveAsDraftButtonToBeVisible() {
        await expect(await this.getSaveAsDraftButton()).toBeVisible()
    }
    async assertPreviewButtonButtonToBeVisible() {
        await expect(await this.getShowPreviewButton()).toBeVisible()
    }
    async assertIFrameResizeButtonToBeVisible() {
        await expect(await this.gettIFrameResizeButton()).toBeVisible()
    }
    async assertUserGetsOneErrorMessage() {
        await expect(await this.getFieldIsRequiredErrorMessage()).toContainText('This field is required.')
    }
    async assertUserGetsTwoErrorMessages() {
        for(let error of await (await this.getFieldIsRequiredErrorMessage()).all()){
            await expect(error).toContainText('This field is required.')
        }
    }
    async assertUserOnMyArticlesPage() {
        await this.page.waitForURL(this.myArticlePage)
        expect(await this.getCurrentURL()).toEqual(this.myArticlePage)
    }
    async assertDropDownWithTagsToBeVisible() {
        await expect(await this.getDropDownWithTags()).toBeVisible();
    }
    async assertCreatedTagContainsTextWhichUserTyped() {
        expect(await this.getCreatedTagInput()).toContain(this.defaultText)
    }
    async assertMinimalCharactersErrorToBeVisible() {
        await expect(await this.getMinimalCharacterErrorField()).toBeVisible()
    }
    async assertMaximumTitleCharactersErrorToBeVisible() {
        await expect(await this.getMaximumSymbolsErrorMessage()).toBeVisible()
    }
    async assertMaximumDescriptionCharErrorToBeVisible() {
        await expect(await this.getMaximumDescriptionCharsErrorMessage()).toBeVisible()
    }

}