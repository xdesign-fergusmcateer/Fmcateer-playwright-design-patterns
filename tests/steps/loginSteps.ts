import {Given, When, Then, Before, After} from '@cucumber/cucumber'
import { chromium, expect, Page, Browser} from '@playwright/test'

let page: Page
let browser: Browser

Before(async () => {
    browser = await chromium.launch ({ headless: false })
    const context = await browser.newContext()
    page = await context.newPage()
});

After(async () => {
    await browser.close()
});

Given("the user is on the login page", async () => {
    await page.goto("https://binaryville.com/account/")
});

When("the user enters a valid email and password", async () => {
    await page.getByRole("textbox", {name: "Email"}).fill("test@example.com")
    await page.getByRole("textbox", {name: "Password"}).fill("password123")
});

Then("the user should see their email and password in the URL", async () => {
    await page.getByRole("button", {name: "Sign in"}).click()
    await expect(page).toHaveURL(/test%40@example.com/)
    await expect(page).toHaveURL(/password123/)
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