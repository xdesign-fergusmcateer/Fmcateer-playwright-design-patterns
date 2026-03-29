import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../browserSetup';
import { LoginPage } from '../../page_objects/login-page2.pom';

let loginPage: LoginPage

Given("the user is on the login page", async () => {
    loginPage = new LoginPage(page);
    await page.goto("https://binaryville.com/account/");
});

When("the user enters a valid email and password", async () => {
    await loginPage.emailLocator.fill("test@example.com");
    await loginPage.passwordLocator.fill("password123");
});

Then("the user should see their email and password in the URL", async () => {
    await loginPage.signInButtonLocator.click();
    await expect(page).toHaveURL(/test%40@example.com/);
    await expect(page).toHaveURL(/password123/);
});

//the 'Then' step fails - I believe the website has been altered and the outcome actually doesn't happen anymore
//Fail message is:

//Failures:

// 1) Scenario: Successful login with valid credentials # features/login.feature:3
//    ✔ Before # tests/steps/loginSteps.ts:7
//    ✔ Given the user is on the login page # tests/steps/loginSteps.ts:17
//    ✔ When the user enters a valid email and password # tests/steps/loginSteps.ts:21
//    ✖ Then the user should see their email and password in the URL # tests/steps/loginSteps.ts:26
//        Error: function timed out, ensure the promise resolves within 5000 milliseconds
//            at Timeout.<anonymous> (/Users/fergusmcateer/Developer/Playwright Design Patterns/node_modules/@cucumber/cucumber/src/time.ts:52:14)
//            at listOnTimeout (node:internal/timers:605:17)
//            at processTimers (node:internal/timers:541:7)
//    ✔ After # tests/steps/loginSteps.ts:13

// 1 scenario (1 failed)
// 3 steps (1 failed, 2 passed)
// 0m07.685s (executing steps: 0m07.676s)