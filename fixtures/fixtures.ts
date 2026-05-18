import {test as base, expect, Page} from '@playwright/test'
import { LoginPage } from '../page_objects/login-page.pom'

type MyFixtures = { 
    loginPage: LoginPage; 
    cartWithItem: any; 
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    cartWithItem: async ({ page }: { page: Page }, use: (r: Page) => Promise<void>) => { 
    await page.goto('https://binaryville.com/shop/');

    const allItems = page.getByRole('main').getByRole('list').getByRole('listitem')
    const filteredItems = allItems.filter({ 
        hasNot: page.getByRole('generic') 
        });
    await filteredItems.first().waitFor()
    const count = await filteredItems.count()
    expect(count).toBeGreaterThan(0)
    const randomIndex = Math.floor(Math.random() * count)
    const randomItem = filteredItems.nth(randomIndex)
    console.log(`Selecting items at index ${randomIndex}`)
    await randomItem.click()
    await expect(page).toHaveURL(/.*product/);

    const addToCartBtn = page.getByRole('button', { name: /Add to cart/i }).first();
    await addToCartBtn.waitFor();
    await addToCartBtn.click();
    await page.getByRole('link', { name: /Shopping Cart/i })
        .locator('span')
        .filter({ hasText: /1/})
        .filter({ visible: true })
        .waitFor();
    await use(page);
    }
});

export{ expect }