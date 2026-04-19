import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    public readonly accountButtonLocator: Locator
    public readonly shoppingCartButtonLocator: Locator
    public readonly aboutButtonLocator: Locator
    public readonly shopButtonLocator: Locator
    public readonly blogButtonLocator: Locator
    public readonly contactButtonLocator: Locator

    constructor(page: Page) {
        this.page = page
        this.accountButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'Account', exact: true})
        this.shoppingCartButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'Shopping Cart', exact: true})
        this.aboutButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'About', exact: true})
        this.shopButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'Shop', exact: true})
        this.blogButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'Blog', exact: true})
        this.contactButtonLocator = page.getByRole('banner')
        .getByRole('link', {name: 'Contact', exact: true})
    }
    
    async clickaccountbutton() {
        await this.accountButtonLocator.click()
    }

    async clickshoppingcartbutton() {
        await this.shoppingCartButtonLocator.click()
    }

    async clickaboutbutton() {
        await this.aboutButtonLocator.click()
    }

    async clickshopbutton() {
        await this.shopButtonLocator.click()
    }

    async clickblogbutton() {
        await this.blogButtonLocator.click()
    }

    async clickcontactbutton() {
        await this.contactButtonLocator.click()
    }
}