const { test, expect } = require('@playwright/test');

test('duckduckgo is loading', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const duckLogo = await page.isVisible('#logo_homepage_link');
  expect(duckLogo).toBe(true);
});


test('Test that search is working', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
await page.waitForSelector('#logo_homepage_link');
await page.fill('#search_form_input_homepage', 'Test')
await page.click('#search_button_homepage')
const result1TextContent = await page.textContent('#r1-0')
expect(result1TextContent).toContain('Test')
 });

 test('Test that search is screenshot', async ({ page }) => {
await page.goto('https://duckduckgo.com/');
await page.waitForSelector('#logo_homepage_link');
await page.fill('#search_form_input_homepage', 'Test')
await page.click('#search_button_homepage')
const result1TextContent = await page.textContent('#r1-0')
expect(result1TextContent).toContain('Test')
 });


test('Test cheat sheet', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
await page.waitForSelector('#logo_homepage_link');
await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
await page.click('#search_button_homepage');
const cheatSheetVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
const cheatSheetTitle = await page.textContent('h3.c-base__title');
expect(cheatSheetVisible).toBe(true);
expect(cheatSheetTitle).toContain('Microsoft Word 2010');
 });


 test('Check that url shortener works', async ({ page }) => {
  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  await page.click('#search_button_homepage');
  const shortenedUrl = await page.getAttribute('#shorten-url', 'value');
  await page.goto(shortenedUrl);
  const url = page.url();
  expect(url).toBe('https://www.wikipedia.org/');
});


test('panda', async ({ page }) => {
  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage");
  await page.waitForNavigation();
const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
  results.forEach(result => {
    expect(result).toContain("Panda");
  });
});


const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
      await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const generatedPassword = await page.textContent(".c-base__title");
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

  const invalidPasswordLengths = ['7', '65'];
  invalidPasswordLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password`, async ({ page }) => {
      await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const isPasswordElementVisible = await page.isVisible(".c-base__sub");
      expect(isPasswordElementVisible).toEqual(false)
    });
  });

