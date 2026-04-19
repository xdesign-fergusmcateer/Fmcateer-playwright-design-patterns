import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../browserSetup';
import { HomePage } from '../../page_objects/home-page.pom';

let homePage: HomePage

Given ("the user is on the home page", async () => {
    homePage = new HomePage(page);
    await page.goto("https://binaryville.com/");
})

When ("the user selects the 'Shop' button", async () => {
    await homePage.clickshopbutton();
})

Then ("the user is directed to the shop page", async () => {
    await expect(page).toHaveURL(/\/shop\//)
})