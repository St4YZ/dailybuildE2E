import { test } from '@playwright/test'
import { MyProfilePage } from '../Page-Objects/MyProfilePage';

test.beforeEach(async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.goToLandingPage();
    await myProfilePage.fillEmailField();
    await myProfilePage.clickOnNextButton()
    await myProfilePage.clickOnLogInTextButton();
    await myProfilePage.fillEmailField();
    await myProfilePage.fillPasswordField();
    await myProfilePage.clickOnLogInButton();
    await myProfilePage.clickOnUserAvatar();
    await myProfilePage.clickOnMyProfileButton()
})

test('Verify that user on "My profile" page has header which includes "DailyBuild" logo, "Search" input, "Add news" button, "My profile" icon', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertLogoContainsNameOfTheSite();
    await myProfilePage.assertSearchFieldIsVisible();
    await myProfilePage.assertNavigationSectionToBeVisible();
    await myProfilePage.assertAddNewsButtonToBeVisible();
    await myProfilePage.assertUserAvatarToBeVisible();
})

test('Verify that user has "Top 10 communities" with "Show more" button on "My profile" page', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertLeftSideBarContainsTopCommunities();
    await myProfilePage.assertLeftSideBarContainsShowMoreButton();
})

test('Verify that user has "Breadcrumb" which displayed as "Home > Profile" and text "My profile" on "My profile" page', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertBreadcrumbToBeVisible();
})

test('Verify that user is able to open the "My profile" burger menu on "My profile" page', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnUserAvatar();
    await myProfilePage.assertBurgerMenuIsExpanded();
    await myProfilePage.assertBurgerMenuToBeVisible();
})

test('Verify that user has Footer which includes logo of DailyBuild, "About us", "Contact us", "Tags", "Communities", "Publishers", "Privacy policy", Cookie policy", "Terms of use" , "Add news" buttons and Version', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertFooterLogoToContainsNameOfTheSite();
    await myProfilePage.assertFooterMenuArray();
    await myProfilePage.assertFooterAddNewsButtonToBeVisible();
})
test('Verify that user has "Feedback" button on the right of the screen on My profile page', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.resizePageResolution();
    await myProfilePage.assertFeedbackButtonToBeVisible();
})
test("Verify that user have 'User's photo', 'User's name', 'User's title', 'User's country', 'User's timezone', 'Edit' and 'Log Out' buttons", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertProfileImageToBeVisible();
    await myProfilePage.assertProfileNameToBeVisible();
    await myProfilePage.assertProfileTitleToBeVisible();
    await myProfilePage.assertProfileCountryToBeVisible();
    await myProfilePage.assertProfileTimezoneToBeVisible();
    await myProfilePage.assertEditTextButtonToBeVisible();
    await myProfilePage.assertLogoutButtonToBeVisible();
})

test('Verify that after clicking at "Log out" button user is logging out from his account', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.assertLogInTextButtonToBeVisibleAfterLogOut();
    await myProfilePage.waitForMainPageURL();
    await myProfilePage.assertCurrentPageURLEqualToMainPageURL();
})

test('Verify that after clicking at "Edit" button user is able to edit his Profile', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertEditProfileText();
})

test('Verify that on editing user has inputs: "User name*", "User title", "Country*", "Time zone*"', async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserNameLabelToBeVisible();
    await myProfilePage.assertUserTitleLabelToBeVisible();
    await myProfilePage.assertUserCountryLabelToBeVisible();
    await myProfilePage.assertUserTimezoneLabelToBeVisible();
})

test("Verify that user has 'User's photo' and buttons: 'Cancel' and 'Save' ", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserPhotoToBeVisible();
    await myProfilePage.assertCancelTextButtonToBeVisible();
    await myProfilePage.assertSaveButtonToBeVisible();
})

test("Verify that user is able to edit the 'User's name'", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserNameIsEdited()
})
test("Verify that user is able to edit 'User's title'", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserTitleIsEdited();
})

test("Verify that user is able to edit the 'User's country' ", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.expandCountryList();
    await myProfilePage.assertUserCountryIsEdited()
})

test("Verify that new edits will not be submitted if user clicks at 'Cancel' button instead of 'Save' ", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertAfterClickOnCancelButtonNothingChanges();
})

test("Verify that user is able to edit the 'User's timezone' ", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.expandTimezoneList();
    await myProfilePage.assertUserTimezoneIsEdited();
})


test("Verify that 'User's name' field is required", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserNameIsRequired();
})

test("Verify that 'User's name' has limit of 32 symbols", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserNameHasLimitOfSymbols();
})

test("Verify that 'User's title' has limit of 32 symbols ", async({page}) => {
    const myProfilePage = new MyProfilePage(page);
    await myProfilePage.clickOnEditTextButton();
    await myProfilePage.assertUserTitleHasLimitOfSymbols();
})