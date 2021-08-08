// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  timeout: 3000,
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      screenshot: 'on',
      launchOptions: {
              //slowMo: 1750,
          },
    },
  };
  module.exports = config;