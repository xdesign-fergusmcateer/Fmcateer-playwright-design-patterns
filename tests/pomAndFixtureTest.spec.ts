import {test, expect} from '../page_objects/fixtures'

//This is a fixture for the login page?

test ('should login using POM', async ({page, loginPage}) => {
  //  const loginPage = new LoginPage(page)
    await page.goto('https://binaryville.com/account/')

    await loginPage.login("test@example.com", "password123")

    await page.waitForLoadState('networkidle');
    expect (page.url()).toContain('password123')
})