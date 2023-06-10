import loginData from '../loginData.json'

export async function login(page) {
    await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
    await page.locator('input[type="email"]').type(loginData.LoginNumber);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Password').type(loginData.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  }

  module.exports = {
    login,
  };