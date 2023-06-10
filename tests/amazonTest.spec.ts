import {test, expect } from '@playwright/test'
import loginData from '../loginData.json'
import { login } from '../page/login';

test('amazonTest', async({page})=>{
    await page.goto('/');
    await login(page);

    await page.getByPlaceholder('Search Amazon.in').click();
    await page.getByPlaceholder('Search Amazon.in').fill("wrogn white sneakers");
    await page.getByPlaceholder('Search Amazon.in').press('Enter');
    await page.getByRole('link', { name: 'US Polo Men\'s Clarkin Sneakers' }).first().click() 

    const page1promise= page.waitForEvent('popup');
    const page1= await page1promise;

    await page1.getByRole('button', { name: 'Buy Now' }).click();
    await page1.getByTestId('Address_selectShipToThisAddress').click();
    await page1.getByText('Pay with Debit/Credit/ATM Cards').click();
    await page1.click('xpath=//a[contains(text(), "Enter card details")]');

    const iframe = page1.frameLocator('iframe[name="ApxSecureIframe"]').first();
    await iframe.getByLabel('Card number').click();
    await iframe.getByLabel('Card number').fill(loginData.cardNumber);
    await iframe.locator('span').filter({ hasText: '01020304050607080910111201' }).locator('span').nth(2).click();
    await iframe.locator('span').getByText(loginData.cardExpiryMonth.toString()).click();
    await iframe.locator('span').filter({ hasText: '20232024202520262027202820292030203120322033203420352036203720382039204020412042' }).locator('span').nth(2).click();
    await iframe.locator('').getByText(loginData.cardExpiryYear.toString()).click();
    await iframe.getByRole('button', { name: 'Enter card details' }).click();
    await expect(iframe.getByRole('alert')).toHaveText("There was a problem.Card number is not correct.")



})
