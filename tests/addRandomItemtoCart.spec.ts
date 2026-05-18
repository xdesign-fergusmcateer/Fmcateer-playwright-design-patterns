import { test, expect } from '@playwright/test'

test.skip()

test('add random item to cart', async ({ page }) => {

    await page.goto('https://binaryville.com/shop/')
    const allItems = page.getByRole('main').getByRole('list').getByRole('listitem')
    const filteredItems = allItems.filter({ 
        hasNot: page.getByRole('generic') // Optional: Excludes items in generic divs if needed 
        });

    await filteredItems.first().waitFor()

    const count = await filteredItems.count()

    expect(count).toBeGreaterThan(0)

    const randomIndex = Math.floor(Math.random() * count)
    const randomItem = filteredItems.nth(randomIndex)
    
    console.log(`Selecting items at index ${randomIndex}`)
    await randomItem.click()

    await expect(page).toHaveURL(/.*product/);
    await page.getByRole('button', {name: "Add to cart"}).click()

    const cartBadge = page.getByRole('link', {name: 'Shopping Cart'})
        .locator('span')
        .filter({ hasText: '1' });

    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText(/1/);

} )