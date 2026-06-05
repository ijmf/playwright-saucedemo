const { test, expect } = require('@playwright/test');

const URL = 'https://www.saucedemo.com';
const USUARIO = 'standard_user';
const SENHA = 'secret_sauce';

test.describe('SauceDemo — Login', () => {

  test('login com credenciais válidas', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', USUARIO);
    await page.fill('#password', SENHA);
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  test('login com senha inválida exibe erro', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', USUARIO);
    await page.fill('#password', 'senha_errada');
    await page.click('#login-button');
    await expect(page.locator('.error-message-container')).toBeVisible();
  });

  test('login com usuário bloqueado exibe erro', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', SENHA);
    await page.click('#login-button');
    await expect(page.locator('.error-message-container')).toBeVisible();
  });

});

test.describe('SauceDemo — Carrinho', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', USUARIO);
    await page.fill('#password', SENHA);
    await page.click('#login-button');
  });

  test('adicionar produto ao carrinho', async ({ page }) => {
    await page.click('.btn_inventory >> nth=0');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('remover produto do carrinho', async ({ page }) => {
    await page.click('.btn_inventory >> nth=0');
    await page.click('.shopping_cart_link');
    await page.click('.cart_button');
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

});

test.describe('SauceDemo — Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', USUARIO);
    await page.fill('#password', SENHA);
    await page.click('#login-button');
    await page.click('.btn_inventory >> nth=0');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
  });

  test('checkout completo com sucesso', async ({ page }) => {
    await page.fill('#first-name', 'Ivan');
    await page.fill('#last-name', 'Ferreira');
    await page.fill('#postal-code', '70000000');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('checkout sem preencher campos exibe erro', async ({ page }) => {
    await page.click('#continue');
    await expect(page.locator('.error-message-container')).toBeVisible();
  });

});