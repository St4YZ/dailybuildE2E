import { test } from '@playwright/test'
import { LandingPage } from '../Page-Objects/LandingPage';



test.beforeEach(async({page}) => {
    const landingPage = new LandingPage(page);
    await landingPage.goToLandingPage();
})

test.describe('First page of Landing page', () => {
    test('Verify that user has displayed Landing page after first time entering DailyBuild [1st page]', async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.waitForLandingPageURL();
        await landingPage.getCurrentURL();        
        await landingPage.assertPrivacyPolicyButtonIsVisible();
        await landingPage.assertSignInWithGoogleButtonIsVisible();
        await landingPage.assertDescriptionTextOfThePageIsVisible();
        await landingPage.assertNextButtonIsVisible();
        await landingPage.assertEmailFieldIsVisible();
        await landingPage.assertCurrentUrlEqualsExpectedLandingPageURL();
    })


    test('Verify that user can click at "Next" button after typing the text in input Email [1st page]', async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.fillRandomEmail();
        await landingPage.clickOnNextButton();
        await landingPage.waitForCommunitiesLandingPageURL();
        await landingPage.getCurrentURL();  
        await landingPage.assertCurrentUrlEqualsExpectedLandingCommunitiesURL();
    })

    test('Verify that user can read the Privacy Policy by clicking them [1st page]', async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.assertPrivacyPolicyIsNotVisible();
        await landingPage.clickOnPrivacyPolicyButton();
        await landingPage.assertPrivacyPolicyIsVisible();
    })


    test('Verify that user cannot click "Next" button if he types wrong email [1st page]', async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.fillEmailField('test123')
        await landingPage.assertNextButtonIsDisabled()
    })

})


test.describe('Second page of Landing page', () => {
    test.beforeEach(async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.fillRandomEmail();
        await landingPage.clickOnNextButton();
    })
    
    test("Verify that user can't click at 'Subscribe' button if no communities selected [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.assertSubscribeButtonToBeDisabled()
    })
    
    test("Verify that user can click at 'Skip' button and being redirected to the Home page [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.clickOnSkipButton();
        await landingPage.waitForMainPageURL();    
        await landingPage.assertCurrentUrlEqualsExpectedMainPageURL();
    })

    test("Verify that user can select communities and clicks at 'Subscribe' button [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.waitForSwitchesSelector();
        await landingPage.checkSwitchButtons();
        await landingPage.clickOnSubscribeButton();
        await landingPage.assertCongratulationText();
    })

    test("Verify that user can unselect communities [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.waitForSwitchesSelector();
        await landingPage.assertCheckButtonsAreChecked();
        await landingPage.assertCheckButtonsAreNotChecked();
    })

    test("Verify that user has name,description and images of communities [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.waitForCommunitiesLandingPageURL();
        await landingPage.assertCommunityNamesAreVisible();
        await landingPage.assertCommunityImagesAreVisible();
        await landingPage.assertCommunityDescriptionsAreVisible();
    })

    test("Verify that user can read the Privacy Policy by clicking them [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.assertPrivacyPolicyIsNotVisible();
        await landingPage.clickOnPrivacyPolicyButton();
        await landingPage.assertPrivacyPolicyIsVisible();
    })
    
    test("Verify that user can click at 'Back' button on [3rd page] and being redirected to the [2nd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.waitForSwitchesSelector();
        await landingPage.getCurrentURL();
        await landingPage.checkSwitchButtons();
        await landingPage.clickOnSubscribeButton();
        await landingPage.getCurrentURL()
        await landingPage.assertCurrentUrlEqualsExpectedLandingFinalPageURL()
        await landingPage.clickOnBackButton()
        await landingPage.assertCurrentUrlEqualsExpectedLandingCommunitiesURL();
    })
})


test.describe('Third page of Landing page', () => {
    test.beforeEach(async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.fillRandomEmail();
        await landingPage.clickOnNextButton();
        await landingPage.waitForSwitchesSelector();
        await landingPage.checkSwitchButtons();
        await landingPage.clickOnSubscribeButton();
    })
    test("Verify that user can click at 'Go to DailyBuild' button and being redirected to the Home page of DailyBuild [3rd page] ", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.clickOnGoToDailyBuildButton();
        await landingPage.waitForMainPageURL();
        await landingPage.assertCurrentUrlEqualsExpectedMainPageURL();
    })


    test("Verify that user is able to read the Privacy Policy by clicking them [3rd page] ", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.assertPrivacyPolicyIsNotVisible();
        await landingPage.clickOnPrivacyPolicyButton();
        await landingPage.assertPrivacyPolicyIsVisible();
    })

    test("Verify that user has no Landing Page after Signing Up [3rd page]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.clickOnGoToDailyBuildButton();
        await landingPage.waitForMainPageURL();  
        await landingPage.reloadPage();
        await landingPage.assertCurrentUrlEqualsExpectedMainPageURL();
    })

    test("Verify that user can scroll the the Privacy Policy can close the 'Privacy Policy' by clicking 'X' button [All pages]", async({page}) => {
        const landingPage = new LandingPage(page);
        await landingPage.clickOnPrivacyPolicyButton();
        await landingPage.waitForPrivacyPolicyTitle();
        await landingPage.scrollLowestTextIntoTheView();
        await landingPage.scrollCloseButtonIntoTheView();
        await landingPage.clickOnCloseButton();
        await landingPage.assertPrivacyPolicyIsNotVisible();
    }) 
})