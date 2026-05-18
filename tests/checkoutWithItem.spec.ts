import { test, expect } from '../fixtures/fixtures';

test.describe('Checkout Flow', () => {

    test('should proceed to checkout with an item already in cart', async ({ cartWithItem }) => {

        await cartWithItem.getByRole('link', {name: 'Shopping Cart'}).click();

        await expect(cartWithItem).toHaveURL(/.*cart/);
        await expect(cartWithItem.getByRole('heading', {name: /Subtotal/})).toBeVisible();

        await cartWithItem.getByRole('button', {name: 'Checkout'}).click();

        await cartWithItem.getByRole('textbox', {name: 'Email address'}).fill('test@123fakemail.fak');

            const shippingForm = cartWithItem.getByRole('group', {name: 'Shipping Address'});

                await shippingForm.getByRole('textbox', {name: 'First name'}).fill('Fakus');
                await shippingForm.getByRole('textbox', {name: 'Last name'}).fill('Fakerson');
                await shippingForm.getByRole('textbox', {name: 'Address'}).fill('123 Fake St');
                await shippingForm.getByRole('textbox', {name: 'Apt/Suite (Optional)'}).fill('F1');
                await shippingForm.getByRole('textbox', {name: 'City'}).fill('Fakesville');

                    {
                        const dropdown = shippingForm.getByRole('combobox', {name: 'State'});
                        const optionCount = await dropdown.locator('option').count(); 
                        const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1; 
                        await dropdown.selectOption({ index: randomIndex });
                    };
                        
                await shippingForm.getByRole('textbox', {name: 'Zip Code'}).fill('12345');
                await shippingForm.getByRole('textbox', {name: 'Phone'}).fill('07777777777');
        
                    {
                          const fieldset = cartWithItem.locator('fieldset', {name: 'Shipping Method'}); 
                          const radios = fieldset.locator('input[type="radio"]');
                          const count = await radios.count();
                          const randomIndex = Math.floor(Math.random() * count);
                          await radios.nth(randomIndex).check({ force: true });
                          await expect(radios.nth(randomIndex)).toBeChecked();
                    };

        await cartWithItem.getByRole('textbox', {name: 'Card Number'}).fill('1234567890123456');
        await cartWithItem.getByRole('textbox', {name: 'Name on Card'}).fill('Fakus Fakerson');
        
            {
                const dropdown = cartWithItem.getByRole('combobox', {name: 'Expiration Month'});
                const optionCount = await dropdown.locator('option').count(); 
                const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1; 
                await dropdown.selectOption({ index: randomIndex });
            };

            {
                const dropdown = cartWithItem.getByRole('combobox', {name: 'Expiration Year'});
                const optionCount = await dropdown.locator('option').count(); 
                const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1; 
                await dropdown.selectOption({ index: randomIndex });
            };

        await cartWithItem.getByRole('textbox', {name: 'Security Code'}).fill('123');
        await cartWithItem.locator('label').filter({ hasText: 'Billing address the same as shipping address' }).click();

        await cartWithItem.getByRole('button', {name: 'Place Order'}).click();

        await expect(cartWithItem).toHaveURL(/success/);
        //await expect(cartWithItem.getByText('123 Fake St')).toBeVisible();
    
    })

})
