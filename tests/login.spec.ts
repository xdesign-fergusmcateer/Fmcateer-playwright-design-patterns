import { test, expect} from '@playwright/test'
import loginData from '../data/loginData.json'

//note: I had to ask Gemini why line 2's import didnt work 
// - the course failed to specify I needed "resolveJsonModule": true, and "esModuleInterop": true in tsconfig.json!

loginData.forEach(({email, password}) => {

test.skip()

test(`User can login with Email ${email}`, async({page}) => {
    
    await page.goto("https://binaryville.com/account/");

    await page.getByRole("textbox", {name: "Email"}).fill(email)
    await page.getByRole("textbox", {name: "Password"}).fill(password)
    await page.getByRole("button", {name: "Sign in"}).click()

    await expect(page).toHaveURL(new RegExp(password))
    })
})