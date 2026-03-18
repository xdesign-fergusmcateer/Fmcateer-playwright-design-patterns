import { test as base, expect } from '@playwright/test'

type MyFixtures = {testData: { email: string; password: string}, authenticatedUser: {}}
const test = base.extend<MyFixtures>({
    testData: async ({ }, use) => {
        const data = {email: "test@example.com", password: "pass123"}
        await use(data)
    },
    authenticatedUser: async({page, testData}, use) => {

    } 
})

test.skip()

//Note the complaints in my editor around testData in lines 4, 8 and 11. The test passes regardless. 
// Unsure how to fix:
//'Object literal may only specify known properties, and 'testData' does not exist in type 'Fixtures<{}, {}, PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>'.
//Property 'testData' does not exist on type 'PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions'.ts(2339)

test("Should log in with test data", async ({ page, testData }) => {
    await page.goto("https://binaryville.com/account")

    const emailInput = page.getByRole("textbox", {name: "Email"});
    await emailInput.fill(testData.email)

    const passwordInput = page.getByRole("textbox", {name: "Password"});
    await passwordInput.fill(testData.password)

    const signInButton = page.getByRole("button", {name: "Sign in"});
    await signInButton.click()

    const url = page.url()
    expect(url).toContain(testData.password)
})