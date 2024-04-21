import { test } from '@playwright/test'
import { MyArticlesPage } from '../Page-Objects/myArticlesPage';

test.beforeEach(async({page}) => {
    const myArticlesPage = new MyArticlesPage(page);
    await myArticlesPage.beforeEachGoToMyArticlesPage();
})

test.describe('Tests for My Articles Page', () => {
    test('Verify that by default user has table with 5 columns "Published","News title","Publisher","Tags","Status" and "Create article" button', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.assertHeaderTableTexts();
        await myArticlesPage.assertNumberOfHeaderTableTexts();
        await myArticlesPage.assertCreateArticleButtonToBeVisible();
    })
    test('Verify that user cannot create Article without entering Name in "My Profile" page', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.logOutAndLoginInSpecificAccount();
        await myArticlesPage.clickOnCreateArticlesButton();
        await myArticlesPage.assertPopUpIsVisible();
        await myArticlesPage.assertPopUpContainsExpectedText();
    })
    test('Verify that after entering Name in "My profile" page user is being redirected to the "Creating article" page after clicking at "Create Article" button', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.clickOnCreateArticlesButton();
        await myArticlesPage.waitForCreateArticlePage();
        await myArticlesPage.assertCurrentURLToEqualCreateArticlePage();
    })
    test('Verify that user has sorting buttons on every column', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.resizePageResolution();
        await myArticlesPage.assertPublishedSortToBeDescending();
        await myArticlesPage.clickOnNewsTitleCell();
        await myArticlesPage.assertNewsTitleSortToBeAscending()
        await myArticlesPage.clickOnPublisherCell();
        await myArticlesPage.assertPublisherSortToBeAscending();
        await myArticlesPage.clickOnTagsCell();
        await myArticlesPage.assertTagsSortToBeAscending();
        await myArticlesPage.clickOnStatusCell();
        await myArticlesPage.assertStatusSortToBeAscending();
    })
    test('Verify that user is able to sort the column using sort buttons', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.resizePageResolution();
        await myArticlesPage.clickOnNewsTitleCell();
        await myArticlesPage.assertNewsTitleSortToBeAscending();
        await myArticlesPage.clickOnNewsTitleCell();
        await myArticlesPage.assertNewsTitleSortToBeDescending();
        await myArticlesPage.clickOnNewsTitleCell();
        await myArticlesPage.assertNewsTitleSortToBeNone();
    })
})

test.describe('Tests for Create Article page', () => {
    test.beforeEach(async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.clickOnCreateArticlesButton();
    })
    test('Verify that user has Title, Select tag + add tags button, Description inputs, "Save changes","Save as draft", "Show preview" buttons and resizing description', async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.assertTitleInputFieldToBeVisible();
        await myArticlesPage.assertTagInputToBeVisible();
        await myArticlesPage.assertAddTagButtonToBeVisible();
        await myArticlesPage.assertIFrameDescriptionFieldToBeVisible();
        await myArticlesPage.assertSaveChangesButtonToBeVisible();
        await myArticlesPage.assertSaveAsDraftButtonToBeVisible();
        await myArticlesPage.assertPreviewButtonButtonToBeVisible();
        await myArticlesPage.assertIFrameResizeButtonToBeVisible();
    })
    test("Verify that user cannot create article if user didn't typed Title and Description", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertUserGetsTwoErrorMessages();
    })
    test("Verify that user cannot create article only with Title typed", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillTitleInputFieldWithDefaultText();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertUserGetsOneErrorMessage();
    })
    test("Verify that user is not able to create article only with description", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillDescriptionInputField();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertUserGetsOneErrorMessage();
    })
    test("Verify that user is able to create article without tags", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillUserTitleField()
        await myArticlesPage.fillDescriptionInputField();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertUserOnMyArticlesPage();
    })
    test("Verify that after clicking at 'Add tag' input user is getting suggested popular tags", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.clickOnTagInput();
        await myArticlesPage.assertDropDownWithTagsToBeVisible();
    })
    test("Verify that user is able to type his own tags", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillTagField();
        await myArticlesPage.clickOnAddTagButton();
        await myArticlesPage.assertCreatedTagContainsTextWhichUserTyped();
    })
    test("Verify that user is able to scroll tags", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.clickOnTagInput();
        await myArticlesPage.waitForDropdownExpanded();
        await myArticlesPage.scrollToTheLastAndFirstTagInDropdown();
    })
    test("Verify that user is getting validation message if types only 1 symbol in Title", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillTitleInputFieldWithOneChar();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertMinimalCharactersErrorToBeVisible();
    })
    test("Verify that user is not able to type more than 256 symbols in Title", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillUserTitleFieldWithMaximumSymbols();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertMaximumTitleCharactersErrorToBeVisible();
    })
    test("Verify that user is not able to type more than 10000 symbols in Description", async({page}) => {
        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.fillDescriptionFieldWithRandomSymbols();
        await myArticlesPage.fillDescriptionInputField();
        await myArticlesPage.clickOnSaveChangesButton();
        await myArticlesPage.assertMaximumDescriptionCharErrorToBeVisible();
    })
})