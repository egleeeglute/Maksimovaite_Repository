const { test, expect } = require('@playwright/test');

const {calculatorMainPage} = require('../pagesCalculator/calculatorMainPage');

const buildVersions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

buildVersions.forEach(buildVersion => {
test.describe('calculator buildversion: ' + buildVersion, () => {
  let page;
  let startPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new calculatorMainPage(page);
  });

  test.beforeEach(async () => {
    await startPage.goto();
    await startPage.selectBuild(buildVersion);
  });


  test.only('No.1 subtract function test with negative value', async () => {
    const inputNumber1 = '9';
    const inputNumber2 = '-5';
    await startPage.insertNumber1(inputNumber1);
    await startPage.insertNumber2(inputNumber2);
    await startPage.selectOperation('1');
    await startPage.clickCalculateButton();
    const textMessage = await startPage.gettextMessage();
    expect(textMessage).toBe('14');
  });


  test.only('No.2 multiply function test, decimal', async () => {
    const inputNumber1 = '11.25';
    const inputNumber2 = '5.43';
    await startPage.insertNumber1(inputNumber1);
    await startPage.insertNumber2(inputNumber2);
    await startPage.selectOperation('2');
    await page.click('#integerSelect');
    await startPage.clickCalculateButton();
    const textMessage = await startPage.gettextMessage();
    expect(textMessage).toBe('61');
  });

 
  test.only('3 divide function test, invalid number1', async () => {
    const inputNumber1 = '5.lui';
    const inputNumber2 = '10';
    await startPage.insertNumber1(inputNumber1);
    await startPage.insertNumber2(inputNumber2);
    await startPage.selectOperation('3');
    await startPage.clickCalculateButton();
    const errorMessage = await startPage.getErrorMessage();
    expect(errorMessage).toBe('Number 1 is not a number');
    });



test.only('4 concatenate function test, string input valid', async () => {
  const inputNumber1 = '5.lui';
  const inputNumber2 = '10';
  const expectedResult = '5.lui10';
  await startPage.insertNumber1(inputNumber1);
  await startPage.insertNumber2(inputNumber2);
  await startPage.selectOperation('4');
  await startPage.clickCalculateButton();
  const textMessage = await startPage.gettextMessage();
  expect(textMessage).toBe(expectedResult);
  });


test.only('5 add function test, maximum characters', async () => {
  const inputNumber1 = '55555555550';
  const inputNumber2 = '10';
  await startPage.insertNumber1(inputNumber1);
  await startPage.insertNumber2(inputNumber2);
  await startPage.selectOperation('0');
  await startPage.clickCalculateButton();
  const newNumber = await page.inputValue('#number1Field');
  expect(newNumber).toBe(inputNumber1.slice(0, -1));
  const textMessage = await startPage.gettextMessage();
  expect(textMessage).toBe('5555555565');
  });
});
});