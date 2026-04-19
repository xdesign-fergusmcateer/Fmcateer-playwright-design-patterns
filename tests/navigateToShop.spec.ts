import { test, expect} from '@playwright/test'

test('Shop button is visible', async( { page } ) => {

    await page.goto( "https://www.binaryville.com" );

    await page.getByRole( 'banner' )
    .getByRole( "link", { name: "Shop", exact: true })
    .click();

    await expect( page ).toHaveURL( /\/shop\// );
})