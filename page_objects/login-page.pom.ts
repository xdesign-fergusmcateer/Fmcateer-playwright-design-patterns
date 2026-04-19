import { Locator, Page } from '@playwright/test'

export class LoginPage {
    public readonly emailLocator: Locator
    public readonly passwordLocator: Locator
    public readonly signInButtonLocator: Locator

    constructor(page: Page) {
        this.emailLocator = page.getByRole('textbox', {name: 'Email'})
        this.passwordLocator = page.getByRole('textbox', {name: 'Password'})
        this.signInButtonLocator = page.getByRole('button', {name: 'Sign in'})
    }

    async login(email: string, password: string) {

    await this.emailLocator.fill(email);
    await this.passwordLocator.fill(password);

    await this.signInButtonLocator.click();
    }
//This is a login method, it's called an 'action'. It will allow us to perform the login process across multiple tests


}

//Note: avoid mixing business logic with your POM. I.e:
//if (userType === 'admin') {
//Logic inside POM - avoid this
//}
// keep your POM focused purely on the mechanics of INTERACTING with the PAGE

//Avoid adding complex logic to your POM
//i.e. some kind of counter function? or:
//for (let i = 0; i < attempts; i++){
//}

//Each POM should represent a single page or component
//Do not include multiple pages or components in one POM - create more POMs!

//Don't hardcode values, like URLs, credentials or element identifiers
//User parameters, constants or config files

//Review and update your POMs as the application evolves

//Don't tie your POM directly to URLs
//POMs should focus on page's structure and behaviour, not specific URLs
//Consider creating POMs that can be extended or composed into larger POMs

//Avoid creating sugar methods in POMs
//these are methods that obscure test actions
//keep methods straightforward and reflective of real user interactions

//Ensure locators in your POM are public