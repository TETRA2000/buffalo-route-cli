import { Browser } from 'puppeteer';
import { infoUrl } from '../util/config';

export default async function (browser: Browser) {
  const page = await browser.newPage();
  await page.goto(infoUrl);
  const element = await page.$('table');
  const text = await (await element?.getProperty('textContent'))?.jsonValue();
  // TODO prettify
  console.log(text);
}
