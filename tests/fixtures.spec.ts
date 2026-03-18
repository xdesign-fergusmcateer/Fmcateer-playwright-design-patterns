import {expect, test} from '@playwright/test'

//Test below is with fixtures. Note that chromium in the import step is also not required now:
test('Sign in button is visible', async({page}) => {
    await page.goto('https://binaryville.com/account')
    const signInButton = page.getByRole('button', {name: 'Sign in'})
    await expect(signInButton).toBeVisible()
})

test.skip()

//Test and import step below are without fixtures:

//import {expect, test, chromium} from '@playwright/test'

// test ('Sign in button is visible', async() => {
//     const browser = await chromium.launch()
//     const page = await browser.newPage()

//     await page.goto('https://binaryville.com/account')
//     const signInButton = page.getByRole('button', {name: 'Sign in'})
//     await expect(signInButton).toBeVisible()
    
//     await browser.close()
// })

